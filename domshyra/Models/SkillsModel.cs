using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace domshyra.Models
{
    public class SkillsModel : YearBaseModel
    {
        public SkillsModel()
        {
            BaseProgrammingYears = Years(new DateTime(2010, 1, 1), DateTime.Now);
            CurrieAndBrownYears = Years(new DateTime(2017, 2, 1), DateTime.Now);
            BootstrapYears = BaseProgrammingYears - 1;
            PSUYears = Years(new DateTime(2013, 2, 1), DateTime.Now);
        }
        public int BaseProgrammingYears { get; set; }
        public int CurrieAndBrownYears { get; set; }
        public int BootstrapYears { get; set; }
        public int ASPMVCYears { get; set; }
        public int PSUYears { get; set; }

    }
}
