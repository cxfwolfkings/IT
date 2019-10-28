using ServiceStack.DataAnnotations;
using System;

namespace LeadChina.CCDMonitor.Infrastrue.Entity
{
    [Serializable]
    [Alias("biz_survey")]
    public class SurveyEntity
    {
        [Alias("survey_id")]
        public long SurveyId { get; set; }

        [Alias("survey_no")]
        public string SurveyNo { get; set; }

        [Alias("survey_date")]
        public DateTime SurveyDate { get; set; }

        [Alias("survey_desc")]
        public string SurveyDesc { get; set; }

        [Alias("survey_imgs")]
        public string SurveyImages { get; set; }
    }
}
