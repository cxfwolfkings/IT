<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ShowMeetingRooms.aspx.cs" Inherits="Com.Colin.Web.PageModel.ShowMeetingRooms" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
  <form id="form1" runat="server">
  <div>

    <asp:DropDownList ID="DropDownListMeetingRooms" runat="server" OnSelectedIndexChanged="OnRoomSelection" Width="165px" AutoPostBack="True">
      <asp:ListItem>Sacher</asp:ListItem>
      <asp:ListItem>Hawelka</asp:ListItem>
      <asp:ListItem>Hummel</asp:ListItem>
      <asp:ListItem>Prückel</asp:ListItem>
      <asp:ListItem>Landtmann</asp:ListItem>
      <asp:ListItem>Sperl</asp:ListItem>
      <asp:ListItem>Alt Wien</asp:ListItem>
      <asp:ListItem>Eiles</asp:ListItem>
    </asp:DropDownList>
    <br />
    <br />
    <asp:Label ID="LabelSelectedRoom" runat="server" Text=""></asp:Label>
    <br />
    <br />
    <asp:Button ID="Button1" runat="server" Text="Submit" PostBackUrl="~/PageModel/MeetingRoomInformation.aspx" />
  </div>
  </form>
</body>
</html>
