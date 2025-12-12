# 🎓 SMR-Hub

Plataforma educativa interactiva para el Ciclo Formativo de **Sistemas Microinformáticos y Redes (SMR)**.

🌐 **Web Desplegada:** [https://smr-hub.pages.dev](https://smr-hub.pages.dev)

![SMR-Hub Screenshot](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop) *(Placeholder imagen)*

## 🚀 Acerca del Proyecto

**SMR-Hub** es una aplicación web moderna diseñada para modernizar la enseñanza de informática. Permite a los estudiantes acceder a contenido estructurado, realizar tests interactivos y seguir su progreso en tiempo real.

### ✨ Características Principales
*   **📚 Estructura Modular**: Temario organizado por asignaturas (Módulos) y unidades.
*   **📝 Visor de Contenido Híbrido**: Soporte para lecciones en Markdown enriquecido y PDFs incrustados.
*   **🧠 Tests Interactivos**: Cuestionarios integrados para autoevaluación.
*   **🏋️ Actividades Prácticas**: Sección dedicada para ejercicios paso a paso.
*   **🔐 Área de Administración**: CMS completo protegidos para que el profesor cree y edite contenido (Editor WYSIWYG, subida de archivos, gestión de tests).
*   **📈 Seguimiento**: Barra de progreso y checks automáticos al completar lecciones.
*   **🎨 Diseño Premium**: Interfaz moderna con Modo Oscuro/Claro, transiciones suaves (Framer Motion) y totalmente responsive.

## 🛠️ Tecnologías Utilizadas

*   **Frontend**: React + TypeScript + Vite
*   **Estilos**: Tailwind CSS + Shadcn/UI
*   **Base de Datos y Auth**: Supabase
*   **Despliegue**: Cloudflare Pages
*   **Animaciones**: Framer Motion

## 📦 Instalación Local

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/Carlitic/SMR-Hub.git
    cd SMR-Hub
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**:
    Crea un archivo `.env` en la raíz con tus claves de Supabase:
    ```env
    VITE_SUPABASE_URL=tu_url_de_supabase
    VITE_SUPABASE_ANON_KEY=tu_clave_anonima
    ```

4.  **Ejecutar en desarrollo**:
    ```bash
    npm run dev
    ```

## 🛡️ Administración

Para acceder al panel de administración, el usuario debe tener el rol de `admin` en la base de datos Supabase:

```sql
UPDATE profiles SET role = 'admin' WHERE id = 'uuid-del-usuario';
```

---
Creado por **Carlos Javier Castaños Blanco**.
Proyecto educativo de código abierto.
