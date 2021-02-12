using System;

namespace domshyra.Models
{
    /// <summary>
    /// Represents what I am interested in
    /// </summary>
    public class IntrestModel : YearBaseModel
    {
        /// <summary>
        /// Constructor
        /// </summary>
        public IntrestModel()
        {
            PianoYears = Years(new DateTime(2019, 1, 1), DateTime.Now);
            GuitarYears = Years(new DateTime(2017, 3, 1), DateTime.Now);
            BassYears = Years(new DateTime(2020, 3, 1), DateTime.Now);
        }
        /// <summary>
        /// Years I have been playing piano
        /// </summary>
        public int PianoYears { get; set; }
        /// <summary>
        /// Years I have been playing guitar
        /// </summary>
        public int GuitarYears { get; set; }
        /// <summary>
        /// Years I have been playing bass guitar
        /// </summary>
        public int BassYears { get; set; }
    }


}
