# Marketplace CRUD System

Este directorio contiene la implementación completa del sistema CRUD para el marketplace de MateLink.

## Estructura de Archivos

### Componentes Principales

- **`edit.tsx`** - Componente principal para crear y editar ofertas
- **`items.tsx`** - Lista de productos con funcionalidades CRUD
- **`sell.tsx`** - Botón y modal para crear nuevas ofertas
- **`marketplace-container.tsx`** - Contenedor principal del marketplace
- **`header.tsx`** - Header con navegación y controles

### Funcionalidades Implementadas

#### 1. Crear Ofertas (CREATE)
- Formulario completo con validación usando Zod
- Subida de múltiples imágenes
- Selección de categorías y condiciones
- API endpoint: `POST http://localhost:8080/offers/api/v1/create`

#### 2. Leer Ofertas (READ)
- Visualización de lista de productos
- Filtros por categoría, precio, ubicación y condición
- Búsqueda por texto
- API endpoint: `GET http://localhost:8080/offers/api/v1`

#### 3. Actualizar Ofertas (UPDATE)
- Edición de ofertas existentes
- Pre-llenado del formulario con datos actuales
- API endpoint: `PUT http://localhost:8080/offers/api/v1/{id}`

#### 4. Eliminar Ofertas (DELETE)
- Botón de eliminación para propietarios
- Confirmación antes de eliminar
- API endpoint: `DELETE http://localhost:8080/offers/api/v1/{id}`

## Interfaces de Datos

### OfferItem
```typescript
interface OfferItem {
  id: string;
  title: string;
  price: number;
  category: string;
  categoryId: number;
  condition: string;
  description: string;
  location: string;
  images: string[];
}
```

### EditItemProps
```typescript
interface EditItemProps {
  item?: OfferItem;
  onSuccess?: () => void;
  onCancel?: () => void;
}
```

## Validación de Formularios

Se utiliza Zod para la validación:
- **Título**: Mínimo 3 caracteres
- **Precio**: Requerido, número válido
- **Categoría**: Requerida
- **Condición**: Requerida (new, like-new, used)
- **Descripción**: Mínimo 10 caracteres
- **Ubicación**: Mínimo 3 caracteres

## Estados de Carga

- Indicadores visuales durante operaciones CRUD
- Botones deshabilitados durante carga
- Spinners de carga con texto descriptivo

## Notificaciones

- Toast notifications para éxito y errores
- Mensajes específicos para cada operación
- Manejo de errores de red y validación

## API Endpoints

Base URL: `http://localhost:8080/offers/api/v1`

- `GET /` - Obtener todas las ofertas
- `POST /create` - Crear nueva oferta
- `PUT /{id}` - Actualizar oferta existente
- `DELETE /{id}` - Eliminar oferta

## Uso

### Crear Nueva Oferta
1. Hacer clic en el botón "Sell" en el header
2. Llenar el formulario con los datos requeridos
3. Subir imágenes (opcional)
4. Hacer clic en "Create Offer"

### Editar Oferta Existente
1. Hacer clic en "Edit" en una oferta propia
2. Modificar los campos deseados
3. Hacer clic en "Update Offer"

### Eliminar Oferta
1. Hacer clic en "Delete" en una oferta propia
2. Confirmar la eliminación

## Dependencias

- React Hook Form para manejo de formularios
- Zod para validación
- Lucide React para iconos
- Sonner para notificaciones toast
- Shadcn/ui para componentes UI

## Próximas Mejoras

- [ ] Confirmación de eliminación con modal
- [ ] Paginación para listas grandes
- [ ] Filtros avanzados
- [ ] Subida real de imágenes a servidor
- [ ] Autenticación y autorización
- [ ] Cache de datos
- [ ] Optimistic updates