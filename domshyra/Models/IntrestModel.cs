using System;

namespace domshyra.Models
{
    public class IntrestModel : YearBaseModel
    {
        public IntrestModel()
        {
            PianoYears = Years(new DateTime(2019, 1, 1), DateTime.Now);
            GuitarYears = Years(new DateTime(2017, 3, 1), DateTime.Now);
        }
        public int PianoYears { get; set; }
        
        public int GuitarYears { get; set; }
    }


}
