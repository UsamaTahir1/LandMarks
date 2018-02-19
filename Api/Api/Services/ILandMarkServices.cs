using Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Services
{
    public interface ILandMarkServices
    {
        LandMark GetLandmark(int id);
        bool CreateLandMark(double longitude, double latitude, string userId);
        bool CreateNote(string text, string userid, int landmarkId);
        bool AddUserNoteToLandMark(Note note, int landmarkId);
        List<LandMark> GetLandmarksOfUser(string userId);
        List<LandMark> GetAllLandmarks(string userId);
        bool UpdateLandMarkNote(int landmarkId, string noteText, string userId);
    }
}
