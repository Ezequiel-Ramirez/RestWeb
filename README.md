# RestWeb - Todo API

Una API REST completa para gestión de tareas (todos) construida con Node.js, Express, TypeScript y Prisma ORM.

## Características

- ✅ API REST completa para gestión de todos
- ✅ Construida con TypeScript y Express
- ✅ Prisma ORM para gestión de base de datos
- ✅ Configuración con Docker para PostgreSQL
- ✅ Arquitectura modular con DTOs (Data Transfer Objects)
- ✅ Validación robusta de datos y manejo de errores
- ✅ Paginación y filtros en consultas
- ✅ Hot reload para desarrollo
- ✅ Patrón de arquitectura limpia

## Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- Docker y Docker Compose (opcional, para base de datos)

## Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd RestWeb
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
PUBLIC_PATH=public
POSTGRES_USER=postgres
POSTGRES_DB=tododb
POSTGRES_PASSWORD=123456
```

### 4. Levantar la base de datos (opcional)

Si deseas usar PostgreSQL con Docker:

```bash
docker compose up -d
```

## Uso

### Desarrollo

```bash
npm run dev
```

Esto iniciará el servidor en modo desarrollo con hot reload en `http://localhost:3000`

### Producción

```bash
# Compilar TypeScript
npm run build

# Iniciar servidor HTTP
npm run start

# Iniciar servidor HTTPS
npm run start:https
```

## API Endpoints

### Todos

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|-------------|
| GET | `/api/todo` | Obtener todos los todos | `?page=1&limit=10&completed=true` |
| GET | `/api/todo/:id` | Obtener un todo por ID | `id` (number) |
| POST | `/api/todo` | Crear un nuevo todo | `title` (string), `completedAt?` (date) |
| PUT | `/api/todo/:id` | Actualizar un todo | `id` (number), `title?` (string), `completedAt?` (date) |
| DELETE | `/api/todo/:id` | Eliminar un todo | `id` (number) |

### Parámetros de Consulta (Query Parameters)

#### GET `/api/todo`
- `page` (opcional): Número de página (por defecto: 1)
- `limit` (opcional): Elementos por página (por defecto: 10, máximo: 100)
- `completed` (opcional): Filtrar por estado completado (`true`/`false`)

### Ejemplos de uso

#### Obtener todos los todos
```bash
# Obtener todos los todos (página 1, 10 elementos)
curl http://localhost:3000/api/todo

# Con paginación
curl "http://localhost:3000/api/todo?page=2&limit=5"

# Filtrar solo completados
curl "http://localhost:3000/api/todo?completed=true"

# Combinando parámetros
curl "http://localhost:3000/api/todo?page=1&limit=20&completed=false"
```

#### Crear un nuevo todo
```bash
curl -X POST http://localhost:3000/api/todo \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi nueva tarea"
  }'

# Con fecha de completado
curl -X POST http://localhost:3000/api/todo \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tarea completada",
    "completedAt": "2024-01-15T10:30:00Z"
  }'
```

#### Obtener un todo específico
```bash
curl http://localhost:3000/api/todo/1
```

#### Actualizar un todo
```bash
# Actualizar solo el título
curl -X PUT http://localhost:3000/api/todo/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tarea actualizada"
  }'

# Marcar como completado
curl -X PUT http://localhost:3000/api/todo/1 \
  -H "Content-Type: application/json" \
  -d '{
    "completedAt": "2024-01-15T10:30:00Z"
  }'

# Actualizar ambos campos
curl -X PUT http://localhost:3000/api/todo/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tarea completada",
    "completedAt": "2024-01-15T10:30:00Z"
  }'
```

#### Eliminar un todo
```bash
curl -X DELETE http://localhost:3000/api/todo/1
```

## Estructura del Proyecto

```bash
RestWeb/
├── src/
│   ├── config/
│   │   ├── data/
│   │   │   └── postgres.ts   # Configuración de Prisma
│   │   └── envs.ts          # Variables de entorno
│   ├── domain/
│   │   └── dtos/
│   │       └── todos/
│   │           ├── create-todo.dto.ts     # DTO para crear todos
│   │           ├── update-todo.dto.ts     # DTO para actualizar todos
│   │           ├── get-todos.dto.ts       # DTO para listar todos
│   │           ├── get-todo-by-id.dto.ts  # DTO para obtener por ID
│   │           ├── delete-todo.dto.ts     # DTO para eliminar todos
│   │           └── index.ts               # Exportaciones de DTOs
│   ├── presentation/
│   │   ├── todos/
│   │   │   ├── controller.ts # Controlador con validación DTO
│   │   │   └── routes.ts     # Rutas de todos
│   │   ├── routes.ts         # Rutas principales
│   │   └── server.ts         # Configuración del servidor
│   └── app.ts               # Punto de entrada
├── prisma/
│   └── schema.prisma        # Esquema de base de datos
├── docker-compose.yml       # Configuración de Docker
├── package.json
├── tsconfig.json
└── README.md
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo
- `npm run build` - Compila el proyecto TypeScript
- `npm run start` - Inicia el servidor en producción (HTTP)
- `npm run start:https` - Inicia el servidor en producción (HTTPS)

## Docker

El proyecto incluye una configuración de Docker Compose para PostgreSQL:

```bash
# Levantar la base de datos
docker compose up -d

# Detener la base de datos
docker compose down

# Ver logs
docker compose logs -f
```

## Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web minimalista
- **TypeScript** - Superset de JavaScript con tipado estático
- **Prisma ORM** - ORM moderno para TypeScript y Node.js
- **PostgreSQL** - Base de datos relacional
- **Docker** - Containerización para desarrollo
- **DTOs (Data Transfer Objects)** - Patrón para validación y transferencia de datos

## Modelo de Datos

### Todo

```typescript
interface Todo {
  id: number
  title: string
  completedAt?: Date | null
  createdAt: Date
  updatedAt: Date
}
```

## Arquitectura y Patrones

### DTOs (Data Transfer Objects)

El proyecto utiliza DTOs para validación y transferencia de datos:

- **CreateTodoDto**: Validación para crear nuevos todos
- **UpdateTodoDto**: Validación para actualizaciones (campos opcionales)
- **GetTodosDto**: Manejo de paginación y filtros
- **GetTodoByIdDto**: Validación de IDs
- **DeleteTodoDto**: Validación para eliminación

### Características de los DTOs

- ✅ Método estático `create()` que retorna `[error?, dto?]`
- ✅ Validación de entrada en el método `create()`
- ✅ Propiedades privadas con métodos getter
- ✅ Método `toObject()` para serialización
- ✅ Manejo consistente de errores

### Ejemplo de uso de DTO

```typescript
const [error, createTodoDto] = CreateTodoDto.create({ title: "Mi tarea" });
if (error) {
  return res.status(400).json({ message: error });
}
const todo = await prisma.todo.create({
  data: createTodoDto!.toObject()
});
```

## Respuestas de Error

La API retorna códigos de estado HTTP estándar:

| Código | Descripción | Ejemplo |
|--------|-------------|----------|
| 200 | Éxito | Operación completada correctamente |
| 400 | Error de validación | `{"message": "Title is required"}` |
| 404 | Recurso no encontrado | `{"message": "Todo not found"}` |
| 500 | Error interno del servidor | Error de base de datos |

### Ejemplos de respuestas de error

```json
// Error de validación (400)
{
  "message": "ID must be a positive number"
}

// Recurso no encontrado (404)
{
  "message": "Todo not found"
}

// Error de paginación (400)
{
  "message": "Limit must be between 1 and 100"
}
```

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia ISC.

## Autor

Ezequiel Ramírez

---

¿Tienes preguntas o sugerencias? ¡No dudes en abrir un issue!
