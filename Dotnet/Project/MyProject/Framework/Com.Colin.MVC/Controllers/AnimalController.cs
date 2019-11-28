using Com.Colin.BusinessLayer;
using Com.Colin.Model;
using Com.Colin.Model.View;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Com.Colin.UI.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AnimalController : Controller
    {
        readonly IAnimalRepository repository;

        /// <summary>
        /// 构造器注入
        /// </summary>
        /// <param name="repository"></param>
        public AnimalController(IAnimalRepository repository)
        {
            this.repository = repository;
        }

        public ActionResult Index()
        {
            List<AnimalModel> animals = repository.GetAll();
            List<AnimalViewModel> animalViewModels = new List<AnimalViewModel>();
            foreach (AnimalModel animal in animals)
            {
                AnimalViewModel animalViewModel = new AnimalViewModel();
                animalViewModel.Name = animal.Name;
                //animalViewModel.SpeciesName = animal.Species.Name;
                animalViewModel.BirthDay = animal.BirthDay.Value.ToString("yyyy-MM-dd");
                animalViewModels.Add(animalViewModel);
            }
            return View(animalViewModels);
        }
    }
}
