## Installation Steps

Follow these steps to install GraphQL and Apollo Server:

1. Open your terminal.
2. Navigate to the project directory.
3. Run the following command to install the required packages:

```shell
    npm install @apollo/server graphql
```

4. Wait for the installation to complete.

You have now successfully installed GraphQL and Apollo Server in your project.

## Some Queries are


```
query ExampleQuery($id: ID!) {
  games {
    id
    title
  }
  authors {
    id
  }
  reviews {
    id
  }
  game(id: $id){
    title
  }
}

Variables

{
  "id": "1"
}
```

```
query GameQuery {
  games {
    title
    platform
    reviews {
      rating
      author {
        name
        reviews {
          content
        }
      }
    }
  }
}
```

```
mutation AddGame($game: GameInput){
  addGame(game: $game){
    title
    platform
  }
}

Variables

{
  "game" :{
    "title": "Shahid Rocks",
    "platform": ["PS5","Nokia"]
  }
}
```

```
mutation DeleteGame($id: ID!){
  deleteGame(id: $id) {
    title
    platform
  }
}

Variables
{
  "id": "2"
}
```

```
mutation UpdateGame($game: GameUpdateInput, $updateGameId: ID!) {

  updateGame(id: $updateGameId, game: $game) {
    title
    platform
  }

}

Variables
{
  "updateGameId": "2",
  "game": {
    "platform":["Shahid Rocks"]
  }

}
```
