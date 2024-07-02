# Modelo de base de datos

En nuestro proyecto decidimos crear dos relaciones:

## User

### Descripción

La entidad `User` representa a cada usuario creado.

### Atributos
- `id` (Integer): identificador único del usuario, primaryKey, autoIncrement
- `username` (String): nombre de usuario
- `password` (String): contraseña del usuario
- `mail` (String): mail del usuario



## Game

### Descripción
La entidad `Game` representa un juego conformado por 4 jugadores.

### Atributos
- `id` (Integer): identificador único del juego, primaryKey, autoIncrement
- `game_finished` (Bool): Indica si el juego ha finalizado.
- `user_1` (Integer): ID del usuario 1
- `user_2` (Integer): ID del usuario 2
- `user_3` (Integer): ID del usuario 3
- `user_4` (Integer): ID del usuario 4
- `player_turn` (Integer): ID del usuario del turno actual
- `position_1` (Integer): Posición del usuario 1
- `position_2` (Integer): Posición del usuario 2
- `position_3` (Integer): Posición del usuario 3
- `position_4` (Integer): Posición del usuario 4


### Consideraciones:
Además para ambas relaciones se crea automáticamente los atributos `createdAt` y `updatedAt` que indican la fecha de creación y actualización de cada instancia.
