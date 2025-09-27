User
  - Discord ID (Primary Key, BIGINT)
  - Admin Level (Integer, 0 = regular user, higher = more admin privileges)
  - Created At (TIMESTAMP)
  - Updated At (TIMESTAMP)

Directory
  - ID (Primary Key)
  - Discord ID (Foreign Key to User)
  - Name (VARCHAR(255))
  - Created At (TIMESTAMP)
  - Updated At (TIMESTAMP)

Sheet
  - ID (Primary Key)
  - Directory ID (Foreign Key to Directory)
  - Content (TEXT)
  - Image hrefs (Array or JSON for CDN links)
  - Created At (TIMESTAMP)
  - Updated At (TIMESTAMP)

Tag
  - ID (Primary Key)
  - Name (VARCHAR(64))
  - Color (VARCHAR(7) for hex codes like #FFFFFF)
  - Created At (TIMESTAMP)
  - Created By (Foreign Key to User)

Sheet_Tags (Junction Table)
  - Sheet ID (Foreign Key to Sheet)
  - Tag ID (Foreign Key to Tag)
  - Added At (TIMESTAMP)
  - Primary Key (Sheet ID, Tag ID)
