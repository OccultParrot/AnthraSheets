# API Thinking Board

## Routes

### User Routes
>
> `GET /api/users`
>
>
> Get a page of the list of users, specify page and page size with query params

> `GET /api/users/:id`
>
>
> Get a specific user by their ID

> `POST /api/users`
>
>
> Create a new user

> `PUT /api/users/:id`
>
> Update a specific user by their ID

> `DELETE /api/users/:id`
>
> Delete a specific user by their ID

### Directory Routes

> `GET /api/directory`
>
> Gets a page of the list of directory entries, specify page and page size with query params
>
> Only shows public directories unless the user is of the minimum admin level

> `GET /api/directory/:id`
>
> Get a specific directory entry by its ID

> `POST /api/directory`
>
> Create a new directory entry

> `PUT /api/directory/:id`
>
> Update a specific directory entry by its ID

> `DELETE /api/directory/:id`
>
> Delete a specific directory entry by its ID

### Sheet Routes

> `GET /api/sheets`
>
> Gets a page of the list of sheets, specify page and page size with query params
>
> Only shows public sheets unless the user is of the minimum admin level

> `GET /api/sheets/:id`
>
> Get a specific sheet by its ID

> `POST /api/sheets`
>
> Create a new sheet

> `PUT /api/sheets/:id`
>
> Update a specific sheet by its ID

> `DELETE /api/sheets/:id`
>
> Delete a specific sheet by its ID

### Tag Routes

> `GET /api/tags`
>
> Gets a page of the list of tags, specify page and page size with query params

> `GET /api/tags/:id`
>
> Get a specific tag by its ID

> `POST /api/tags`
>
> Create a new tag. ONLY AVAILABLE TO ADMIN USERS

> `PUT /api/tags/:id`
>
> Update a specific tag by its ID. ONLY AVAILABLE TO ADMIN USERS

> `DELETE /api/tags/:id`
>
> Delete a specific tag by its ID. ONLY AVAILABLE TO ADMIN USERS

### Game Query Routes

*nothing here yet, I need to figure out RCON stuff*

## Auth

When we use the discord auth stuff and we store information as a server side cookie,
we store the users admin level and when they fetch for admin stuff
we make sure their level is atleast a certain tier.
