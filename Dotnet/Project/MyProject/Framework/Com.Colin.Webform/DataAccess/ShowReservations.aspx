<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ShowReservations.aspx.cs" Inherits="Com.Colin.Web.DataAccess.ShowReservations" %>

<%@ Register Assembly="System.Web.DataVisualization, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI.DataVisualization.Charting" TagPrefix="asp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title></title>
</head>
<body>
  <form id="form1" runat="server">
  <div>

    <asp:DropDownList ID="DropDownList1" runat="server" AutoPostBack="True" DataSourceID="EntityDataSource1" DataTextField="RoomName" DataValueField="Id" Height="22px" Width="150px">
    </asp:DropDownList>
    <br />
    <br />
    <asp:EntityDataSource ID="EntityDataSource1" runat="server" ConnectionString="name=RoomReservationEntities" DefaultContainerName="RoomReservationEntities" EnableFlattening="False" EntitySetName="MeetingRooms" EntityTypeFilter="MeetingRoom" OnContextCreating="OnContextCreating" OnContextDisposing="OnContextDisposing">
    </asp:EntityDataSource>
    <br />
    <asp:GridView ID="GridView1" runat="server" DataSourceID="EntityDataSource2" AllowPaging="True" AllowSorting="True" AutoGenerateColumns="False">
      <Columns>
        <asp:CommandField ShowDeleteButton="True" ShowEditButton="True" ShowSelectButton="True" />
        <asp:BoundField DataField="Id" HeaderText="Id" ReadOnly="True" SortExpression="Id"></asp:BoundField>
        <asp:TemplateField HeaderText="Contact" SortExpression="Contact">
          <EditItemTemplate>
            <asp:TextBox ID="TextBox2" runat="server" Text='<%# Bind("Contact") %>'></asp:TextBox>
          </EditItemTemplate>
          <ItemTemplate>
            <asp:Label ID="Label2" runat="server" Text='<%# Bind("Contact") %>'></asp:Label>
          </ItemTemplate>
        </asp:TemplateField>
        <asp:BoundField DataField="ReservedFrom" HeaderText="From" SortExpression="ReservedFrom"></asp:BoundField>
        <asp:BoundField DataField="ReservedTo" HeaderText="To" SortExpression="ReservedTo"></asp:BoundField>
        <asp:TemplateField HeaderText="MeetingRoom" SortExpression="MeetingRoom">
          <EditItemTemplate>
            <asp:DropDownList ID="DropDownList2" runat="server"
              DataTextField="RoomName" DataValueField="Id"
              Width="146px" Height="16px" SelectedValue='<%# Bind("RoomId") %>' DataSourceID="EntityDataSource1">
            </asp:DropDownList>
          </EditItemTemplate>
          <ItemTemplate>
            <asp:Label ID="Label1" runat="server" Text='<%# Bind("MeetingRoom.RoomName") %>'></asp:Label>
          </ItemTemplate>
        </asp:TemplateField>
      </Columns>
    </asp:GridView>
    <br />
    <br />
    <br />
    <asp:EntityDataSource ID="EntityDataSource2" runat="server" AutoGenerateWhereClause="True" ConnectionString="name=RoomReservationEntities" DefaultContainerName="RoomReservationEntities" EnableDelete="True" EnableFlattening="False" EnableInsert="True" EnableUpdate="True" EntitySetName="Reservations" Where="" Include="MeetingRoom" OnContextCreating="OnContextCreating" OnContextDisposing="OnContextDisposing">
      <WhereParameters>
        <asp:ControlParameter ControlID="DropDownList1" Name="RoomId" PropertyName="SelectedValue" Type="Int32" />
      </WhereParameters>
    </asp:EntityDataSource>
    <br />

  </div>
  </form>
</body>
</html>
