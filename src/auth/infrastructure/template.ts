export const getEmailTemplate = (data: any) => {
  const { email, token } = data;

  const emailUser = email.split("@")[0].toString();
  const url = "http://localhost:8080/public/index.html";

  return `
  <form>
    <div>
      <label>Hola ${emailUser}</label>
      <br>
      <a href="${url}?token=${token}" target="_blank">Recuperar contraseña</a>
    </div>
  </form>
  `;
};
