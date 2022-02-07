using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace AspNetCoreWebApi.Model
{
    public class User : IdentityUser<int>
    {
        public string Name { get; set; }
        public string Gender { get; set; }
    }
}