export const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
export const emptyRegex = /^\s?$/;
export const passwordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,19})\S$/;
export const nameRegex = /^\s?[a-zA-Z]{2,}([- ][a-zA-Z]{2,}){1,3}\s?$/;
export const edadRegex = /^\d{1,3}$/