using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Com.Colin.Web.PageModel
{
  public partial class ShowMeetingRooms : System.Web.UI.Page
  {
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void OnRoomSelection(object sender, EventArgs e)
    {
      this.LabelSelectedRoom.Text = DropDownListMeetingRooms.SelectedItem.Value;
    }

    public string SelectedMeetingRoom
    {
      get
      {
        return DropDownListMeetingRooms.SelectedItem.Value;
      }
    }
  }
}