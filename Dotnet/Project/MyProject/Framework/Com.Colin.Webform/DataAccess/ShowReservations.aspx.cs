using System;
using System.Web.UI.WebControls;

namespace Com.Colin.Web.DataAccess
{
  public partial class ShowReservations : System.Web.UI.Page
  {
    private RoomReservationEntities data;

    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void OnContextCreating(object sender, EntityDataSourceContextCreatingEventArgs e)
    {
      if (data == null)
      {
        data = new RoomReservationEntities();
      }
      e.Context = data;
    }

    protected void OnContextDisposing(object sender, EntityDataSourceContextDisposingEventArgs e)
    {
      if (data != null)
      {
        data.Dispose();
        data = null;
      }
    }
  }
}