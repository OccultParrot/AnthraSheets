import express from 'express';

import { User } from "../../models/index.js";

const router = express.Router();


router.get("/", (req, res) => {
  res.redirect(process.env.DISCORD_OAUTH_URL || "api/auth/discord/noredirect");
});

router.get("/noredirect", (req, res) => {
  res.send("No redirect URL set in environment variables.");
});

router.get("/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.redirect(`${ process.env.FRONTEND_URL }/indev?error=no_code`)
  }

  console.log("Received code:", code);

  try {
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI,
      })
    });

    if (!tokenResponse.ok) {
      throw new Error(`Failed to fetch tokens: ${ tokenResponse.status }\n${ await tokenResponse.text() }`);
    }

    const tokenData = await tokenResponse.json();
    const { access_token, refresh_token } = tokenData;

    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${ access_token }`
      }
    })

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user data: ${ userResponse.status }`);
    }

    const userData = await userResponse.json();

    const avatarUrl = userData.avatar
      ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
      : null;

    req.session.user = {
      id: userData.id,
      username: userData.username,
      displayName: userData.global_name,
      discriminator: userData.discriminator,
      email: userData.email,
      avatar: userData.avatar,
      access_token,
      refresh_token
    }

    console.warn("User data from Discord:", userData);

    try {
      await User.findOrCreate({
        where: { discord_id: userData.id },
        defaults: {
          username: userData.username,
          global_name: userData.global_name || null,
          discriminator: userData.discriminator,
          email: userData.email || null,
          avatar_url: avatarUrl,
        }
      })
    } catch (error) {
      console.error("Error finding or creating user:", error);
      return res.redirect(`${ process.env.FRONTEND_URL }/indev?error=user_db_error`);
    }

    res.redirect(`${ process.env.FRONTEND_URL }/dashboard`);

  } catch (error) {
    console.error("Error during Discord OAuth callback:", error);
    return res.redirect(`${ process.env.FRONTEND_URL }/indev?error=oauth_failed`);
  }
});

export default router;