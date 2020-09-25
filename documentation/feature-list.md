# Features
## Browse Decks

## Create Decks

## Practice Mode

## Quiz Mode

## Search decks

# Endpoints
## Pages
| Path     | Destination  | Contents                                                      |
|----------|--------------|---------------------------------------------------------------|
| `/`      | Homepage     | Users see their decks, without login splashpage/sign up form  |
| `/login` | Login form   | redirects to `/` when signed in                               |
| `/browse`| Public decks | renders a collection of recent decks                          |

## API Endpoints
| Path                   | Method   | Result                           |
|------------------------|----------|----------------------------------|
| `/api/session`         | `POST`   | login                            |
| `/api/session`         | `DELETE` | logout                           |
| `/api/decks`           | `GET`    | a collection of decks (limit 20) |
| `/api/decks`           | `POST`   | creates a new deck               |
| `/api/decks/:id`       | `GET`    | returns deck with cards          |
| `/api/decks/:id`       | `DELETE` | deletes a deck                   |
| `/api/cards`           | `POST`   | creates a new card               |
| `/api/cards/:id`       | `PUT`    | updates an existing card         |
| `/api/cards/:id`       | `DELETE` | deletes a card                   |
| `/api/users/:id/decks` | `DELETE` | deletes a card                   |


# State shape
```json
{
  entities:{
  },
  session: {
    id: 1
  },
  errors: {
    session: []
  }
}
```
# Schema
![schema](images/Schema.png)
