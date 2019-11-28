using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Com.Colin.Web.DataAccess
{
  public class RoomReservationFactory
  {
    public IEnumerable<MeetingRoom> MeetingRooms()
    {
      IEnumerable<MeetingRoom> rooms;
      using (RoomReservationEntities data = new RoomReservationEntities())
      {
        rooms = data.MeetingRooms.ToList();
      }
      return rooms;
    }

    public IEnumerable<Reservation> GetReservationsByRoom(int roomId)
    {
      IEnumerable<Reservation> reservations;
      using (RoomReservationEntities data = new RoomReservationEntities())
      {
        reservations = data.Reservations.Where(r => r.RoomId == roomId).ToList();
      }
      return reservations;
    }

    public void UpdateReservation(Reservation reservation)
    {
      using (RoomReservationEntities data = new RoomReservationEntities())
      {
        data.Reservations.Attach(reservation);
        data.ObjectStateManager.ChangeObjectState(reservation, EntityState.Modified);
        data.SaveChanges();
      }
    }
  }
}