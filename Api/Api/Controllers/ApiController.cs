using Api.Dtos;
using Api.Entities;
using Api.Models;
using Api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Security.Claims;

namespace Api.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class ApiController : Controller
    {
        private readonly dynamic user;
        private readonly ILandMarkServices _landmarkServices;
        private IMapper _mapper;

        public ApiController(
            ILandMarkServices landmarkServices,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
        {
            _mapper = mapper;
            _landmarkServices = landmarkServices;
            user = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Name).Value;

        }

        [HttpGet("getalllandmarks")]
        public IActionResult GetAllLandMarks()
        {
            var markers = _landmarkServices.GetAllLandmarks(user.ToString());
            return Ok(markers);
        }
        // GET api/values/5
        [HttpGet]
        public List<LandMark> GetLandMarksOfUser()
        {
            return _landmarkServices.GetLandmarksOfUser(user.ToString());
        }

        // POST api/values
        [HttpPost("createLandMark")]
        public void CreateLandMark([FromBody]LandmarkDto landMark)
        {
            var obj = landMark;//JsonConvert.DeserializeObject<LandMark>(landMark.ToString());
            if (obj != null)
            {
                _landmarkServices.CreateLandMark(obj.longitude, obj.latitude, user.ToString());

            }
        }

        [HttpPost("updatelandmark")]
        public bool UpdateLandMarkNote([FromBody]ParamsModel model)
        {
            if (model != null && model.landmarkId > 0 && !string.IsNullOrEmpty(model.noteText))
            {
               return _landmarkServices.UpdateLandMarkNote(model.landmarkId, model.noteText, user.ToString());

            }
            return false;
        }

    }
}
