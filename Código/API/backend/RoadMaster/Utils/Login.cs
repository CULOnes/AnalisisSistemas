using Microsoft.IdentityModel.Tokens;
using RoadMaster.Controllers;
using RoadMaster.Repositories;
using RoadMaster.Repositories.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace RoadMaster.Utils
{
    public class Login
    {
        public LoginResponse Token(Usuarios usuarios, IConfiguration config)
        {
            try
            {

                var expires = DateTime.UtcNow.AddHours(16);
                var claims = new List<Claim>()
                {
                    new Claim("SystemName", usuarios.Usu_Nombre)
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JwtKey"]));
                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

                var securityToken = new JwtSecurityToken(
                    issuer: null,
                    audience: null,
                    claims: claims,
                    expires: expires,
                    signingCredentials: credentials
                    );
                return new LoginResponse
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(securityToken)
                };
            }
            catch (Exception ex)
            {
                return new LoginResponse
                {
                    Token = "Error" + ex.Message
                };

            }

        }

        public string encripter(string texto)
        {
            SHA512 sha512 = SHA512.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] textoEnBytes = sha512.ComputeHash(encoding.GetBytes(texto));
            StringBuilder textoEncriptado = new StringBuilder();
            for (int i = 0; i < textoEnBytes.Length; i++) textoEncriptado.AppendFormat("{0:x2}", textoEnBytes[i]);
            return textoEncriptado.ToString();
        }
    }
}
