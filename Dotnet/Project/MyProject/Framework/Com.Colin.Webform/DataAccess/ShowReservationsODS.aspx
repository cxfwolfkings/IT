<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ShowReservationsODS.aspx.cs" Inherits="Com.Colin.Web.DataAccess.ShowReservationsODS" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
      <asp:ObjectDataSource ID="ObjectDataSource1" runat="server" SelectMethod="MeetingRooms" TypeName="Com.Colin.Web.DataAccess.RoomReservationFactory"></asp:ObjectDataSource>
      <br />
      <asp:DropDownList ID="DropDownList1" runat="server" AutoPostBack="True" DataSourceID="ObjectDataSource1" DataTextField="RoomName" DataValueField="Id" Height="17px" Width="216px">
      </asp:DropDownList>
      <br />
      <br />
      <br />
      <asp:ObjectDataSource ID="ObjectDataSource2" runat="server" DataObjectTypeName="Com.Colin.Web.DataAccess.Reservation" SelectMethod="GetReservationsByRoom" TypeName="Com.Colin.Web.DataAccess.RoomReservationFactory" UpdateMethod="UpdateReservation">
        <SelectParameters>
          <asp:ControlParameter ControlID="DropDownList1" Name="roomId" PropertyName="SelectedValue" Type="Int32" />
        </SelectParameters>
      </asp:ObjectDataSource>
      <br />
      <br />
      <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataSourceID="ObjectDataSource2">
        <Columns>
          <asp:BoundField DataField="Id" HeaderText="Id" SortExpression="Id" />
          <asp:BoundField DataField="ReservedFrom" HeaderText="ReservedFrom" SortExpression="ReservedFrom" />
          <asp:BoundField DataField="ReservedTo" HeaderText="ReservedTo" SortExpression="ReservedTo" />
          <asp:BoundField DataField="Contact" HeaderText="Contact" SortExpression="Contact" />
          <asp:BoundField DataField="RoomId" HeaderText="RoomId" SortExpression="RoomId" />
        </Columns>
      </asp:GridView>
      <br />
    
    </div>
    </form>
</body>
</html>
