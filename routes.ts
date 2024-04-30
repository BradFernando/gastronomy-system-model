/**
 * Un arreglo de rutas sobre las que son accesbiles para el público en general.
 * Estas rutas no requieren de autenticación.
 * @type {string[]}
 */

export const publicRoutes: string[] = [
  "/",
];

/**
 * Un arreglo de rutas sobre las que son accesibles para los usuarios autenticados.
 * Estas rutas redireccionará a los usuarios logeados para las configuraciones de su cuenta.
 * @type {string[]}
 */

export const authRoutes: string[] = [
    "/auth/login",
    "/auth/register",
];

/**
 * Este prefijo es para API de autenticación de rutas.
 * Estas rutas inician con este prefijo que son usados por la API de autenticación.
 * @type {string}
 */

export const apiAuthPefix: string = "/api/auth";

/**
 * La ruta predeterminada a la que se redireccionará el usuario después de iniciar sesión.
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT: string = "/settings";

