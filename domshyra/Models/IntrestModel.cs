using System;

namespace domshyra.Models
{
    public class IntrestModel
    {
        public IntrestModel()
        {
            PianoYears = Years(new DateTime(2019, 1, 1), DateTime.Now);
            GuitarYears = Years(new DateTime(2017, 3, 1), DateTime.Now);
        }
        public int PianoYears { get; set; }
        
        public int GuitarYears { get; set; }

        private int Years(DateTime start, DateTime end)
        {
            return (end.Year - start.Year - 1) +
                (((end.Month > start.Month) ||
                ((end.Month == start.Month) && (end.Day >= start.Day))) ? 1 : 0);
        }
    }


}
