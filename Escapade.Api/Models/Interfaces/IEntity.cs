﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EscapadeApi.Models.Interfaces
{
    public interface IEntity
    {
        Guid Id { get; set; }
    }
}
