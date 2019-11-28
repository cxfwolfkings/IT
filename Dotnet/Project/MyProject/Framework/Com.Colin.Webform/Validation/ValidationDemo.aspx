<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ValidationDemo.aspx.cs" Inherits="Com.Colin.Web.Validation.ValidationDemo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title></title>
  <style type="text/css">
    .auto-style1 {
      width: 100%;
    }
  </style>
</head>
<body>
  <form id="form1" runat="server">
  <div>


    <div>

      <table class="auto-style1">
        <tr>
          <td>Name:</td>
          <td>
            <asp:TextBox ID="TextName" runat="server"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="TextName" ErrorMessage="Name required" ValidationGroup="Register">*</asp:RequiredFieldValidator>
          </td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>
            <asp:TextBox ID="TextEmail" runat="server"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="TextEmail" Display="Dynamic" ErrorMessage="Email required" ValidationGroup="Register">*</asp:RequiredFieldValidator>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="TextEmail" Display="Dynamic" ErrorMessage="Please enter an email" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" ValidationGroup="Register">*</asp:RegularExpressionValidator>
          </td>
        </tr>
        <tr>
          <td>
            <asp:Button ID="Button1" runat="server" Text="Register" ValidationGroup="Register" />
          </td>
          <td>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server" ValidationGroup="Register" />
          </td>
        </tr>
      </table>

    </div>
    <div>
            <table class="auto-style1">
        <tr>
          <td>Event:</td>
          <td>
            <asp:TextBox ID="TextEvent" runat="server"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ControlToValidate="TextEvent" ErrorMessage="Name required" ValidationGroup="Event"></asp:RequiredFieldValidator>
          </td>
        </tr>
        <tr>
          <td>Date:</td>
          <td>
            <asp:TextBox ID="TextDate" runat="server"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" ControlToValidate="TextDate" Display="Dynamic" ErrorMessage="Date required" ValidationGroup="Event"></asp:RequiredFieldValidator>
            <asp:CompareValidator ID="CompareValidator1" runat="server" ControlToValidate="TextDate" ErrorMessage="Enter a date" Operator="DataTypeCheck" Type="Date" ValidationGroup="Event"></asp:CompareValidator>
          </td>
        </tr>
        <tr>
          <td>
            <asp:Button ID="Button2" runat="server" Text="Submit" ValidationGroup="Event" />
          </td>
          <td>
            &nbsp;</td>
        </tr>
      </table>
    </div>
  </div>
  </form>
</body>
</html>
