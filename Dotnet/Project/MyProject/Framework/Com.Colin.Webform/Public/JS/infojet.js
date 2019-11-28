/*
* InfoJetSoft Copyright 2005-2008
* Updated 2008.10.06
*/
var InfoJet_WebContext = "";
var InfoJet_NoErrorFormatting = false;
var InfoJet_BrowserQuick = false;
var InfoJet_Changed = false;
var InfoJet_ValueChanging = 0;
var InfoJet_Postbacking = 0;
var InfoJet_Interval = 500;
var InfoJet_WaitTimes = 120;
var InfoJet_ValidSubmit = true;
var InfoJet_CorrectFirstMessage = "This form contains validation errors. Errors are marked with either a red underline(required fields) or a red, dashed border(invalid values). \nPlease correct them first.";
var InfoJet_DeleteAllMessage = "This action will delete all information in the current form.\n\nDo you want to continue?";
var InfoJet_AMP = "&";
var InfoJet_NoValidation = false;
var InfoJet_NoPostback = false;
//CID 0134 //hgzhang //2008.10.05 //Begin
var InfoJet_UseAjax = 'sync';
//CID 0134 //hgzhang //2008.10.05 //End
var InfoJet_XHR = null;
var InfoJet_AjaxBracket = null;  //for EditPart.
var InfoJet_ShortDatePattern = "yyyy-M-d";
var InfoJet_LongDatePattern = "yyyy-MM-dd";
var InfoJet_YearMonthPattern = "yyyy-M";
var InfoJet_XdPrefix = "xd:";
var InfoJet_SelectFileMessage = "[Please select a file ...]";
var InfoJet_EnableUnderline = false;
var InfoJet_XDocumentDOM = null;
var InfoJet_ReplaceBrowserContextMenu = true;
var InfoJet_ShowMenuArrow = true;
var InfoJet_Progress = null;
var InfoJet_ShowProgress = false;
//CID 0077 //hgzhang //2008.08.03 //Begin
var InfoJet_ModalScreen = null;
var InfoJet_ShowModalScreen = false;
//CID 0077 //hgzhang //2008.08.03 //End
var InfoJet_FuncAfterInit = null;
//CID 0023 //hgzhang //2008.06.19 //Begin
var InfoJet_SaveAsPage = null;
//CID 0023 //hgzhang //2008.06.19 //End
//CID 0048 //hgzhang //2008.07.15 //Begin
var InfoJet_EnableReplaceGroupingSymbol = false;
//CID 0048 //hgzhang //2008.07.15 //End

function InfoJet_IsValid(){
	var xdocError = document.getElementById( "xdoc_data_error" );
	if( xdocError == null ){
		return true;
	}
	var errors = InfoJet_CollectChildren( xdocError );
	if( errors.length > 0 ){
		return false;
	}else{
		return true;
	}
	return true;
}

function InfoJet_IsViewValid(){
	var xdocFieldStyles = document.getElementById( "xdoc_fieldstyle" );
	if( xdocFieldStyles == null ){
		return true;
	}
	var fieldStyles = InfoJet_CollectChildren( xdocFieldStyles );
	for( var index = 0; index < fieldStyles.length; index ++ ){
		var fieldStyle = fieldStyles[index];
		if( fieldStyle.tagName.indexOf( "/" ) < 0 ){
			if( fieldStyle.id.lastIndexOf( "_notBlank" ) == (fieldStyle.id.length - 9) ){
				if( fieldStyle.style.display != "none" ){
					return false;
				}
			}else{
				if( parseInt(fieldStyle.style.height) > 0 || parseInt(fieldStyle.style.width) > 0 ){
					return false;
				}
			}
		}
	}
	return true;
}

function InfoJet_NeedSectionBorder( section ){
	if( section == null ){
		return;
	}
	if( section.tagName ){
		var tagName = section.tagName.toLowerCase();
		try{
			var xctname = section.getAttribute( InfoJet_XdPrefix + "xctname" );
			if( xctname == null || xctname.length <= 0 ){
				if( tagName == "tr" || tagName == "td" ){
					return true;
				}else{
					return false;
				}
			}else if( xctname != null && xctname == "ExpressionBox"  ){
				return false;
			}else{
				return true;
			}
		}catch( e ){
			return false;
		}
	}
}

function InfoJet_NeedFieldBorder( control ){
	if( InfoJet_IsTextControl( control ) ){
		if( !control.disabled ){
			return true;
		}else{
			return false;
		}
	}
	var tagName = control.tagName.toLowerCase();
	if( tagName == "img" ){
		return true;
	}
	return false;
}

function InfoJet_IsTextControl( control ){
	var tagName = control.tagName.toLowerCase();
	if( tagName == "input" ){
		var type = control.getAttribute( "type" );
		if( type != null ){
			type = type.toLowerCase();
			if( type == "text" || type == "password" ){
				return true;
			}
		}
	}else if( tagName == "textarea" ){
		return true;
	}
	return false;
}

function InfoJet_IsSelect( control ){
	var tagName = control.tagName.toLowerCase();
	if( tagName == "select" ){
		return true;
	}
	return false;
}

function InfoJet_IsIdInArray( id , idArrayName ){
	var element = document.getElementById( idArrayName );
	if( element == null ){
		return false;
	}
	var idArray = element.innerHTML;
	var ids = idArray.split( ";" );
	for( var i = 0 ; i < ids.length ; i ++ ){
		if( id == ids[ i ] ){
			return true;
		}
	}
	return false;
}

function InfoJet_GetElementId( element ){
	var id = element.id;
	return InfoJet_GetPureId( id );
}

function InfoJet_GetPureId( id ){
	var index = id.indexOf( "," );
	if( index > 0 ){
		return id.substr( 0 , index );
	}else{
		return id;
	}
}

function InfoJet_PureIdEquals( id1, id2 ){
	if( InfoJet_GetPureId( id1 ) == InfoJet_GetPureId( id2 ) ){
		return true;
	}else{
		return false;
	}
}

function InfoJet_IsIE(){
	if( document.all ){
		return true;
	}else{
		return false;
	}
}

function InfoJet_GetEvent( event ){
	if( event == null ){
		return window.event;
	}else{
		return event;
	}
}

function InfoJet_GetEventSource( event ){
	var event = InfoJet_GetEvent( event );
	if( InfoJet_IsIE() ){
		return event.srcElement;
	}else{
		return event.target;
	}
}

function InfoJet_GetParent( element ){
	if( element == null ){
		return null;
	}
	if( InfoJet_IsIE() ){
		return element.parentElement;
	}else{
		return element.parentNode;
	}
}

function InfoJet_GetAllChildren( element ){
	var all = new Array();
	InfoJet_GetChildren( element , all );
	return all;
}

function InfoJet_GetChildren( element , all ){
	if( InfoJet_IsIE() ){
		for( var i = 0 ; i < element.children.length ; i ++ ){
			all[ all.length ] = element.children( i );
			InfoJet_GetChildren( element.children( i ) , all );
		}
	}else{
		for( var i = 0 ; i < element.childNodes.length ; i ++ ){
			if( element.childNodes[ i ].nodeType != 3 ){
				all[ all.length ] = element.childNodes[ i ];
				InfoJet_GetChildren( element.childNodes[ i ] , all );
			}
		}
	}
}

function InfoJet_CollectChildren( element ){
	var children = new Array();
	if( InfoJet_IsIE() ){
		for( var i = 0 ; i < element.children.length ; i ++ ){
			children[ children.length ] = element.children( i );
		}
	}else{
		for( var i = 0 ; i < element.childNodes.length ; i ++ ){
			if( element.childNodes[ i ].nodeType != 3 ){
				children[ children.length ] = element.childNodes[ i ];
			}
		}
	}
	return children;
}

function InfoJet_GetFrameDocument( frameId ){
	if( InfoJet_IsIE() ){
		var frame = document.frames[ frameId ];
		return frame.document;
	}else{
		var frame = document.getElementById( frameId );
		return frame.contentDocument;
	}
}

function InfoJet_GetDocumentForm( document , formId ){
	if( InfoJet_IsIE() ){
		return document.forms[ formId ];
	}else{
		return document.getElementById( formId );
	}
}

function InfoJet_ShouldContinueBlur(){
	if( InfoJet_IsIE() ){
		var activeElement = document.activeElement;
		if( activeElement != null ){
			if( activeElement.id == "xdoc_menu_focus_arrow" ){
				return false;
			}
			var xdoc_menu = activeElement.getAttribute( "xdoc_menu" );
			if( xdoc_menu != null && xdoc_menu == "yes" ){
				return false;
			}
		}
		return true;
	}else{
		var menuArrow = document.getElementById( "xdoc_menu_focus_arrow" );
		if( menuArrow.style.display == "block" ){
			return false;
		}
		return true;
	}
}

function InfoJet_SimulateFocus( event , source , type ){
	if( !InfoJet_IsIE() ){
		InfoJet_OnFocus( event , source , type );
	}
}

function InfoJet_GetPos( element ){
	var pos = {left:0 , top:0};
	if( InfoJet_IsIE() ){
		var rect = element.getBoundingClientRect();
		var offsetX = 0;
		var offsetY = 0;
		var first = element.getClientRects()[0];
		if( first.left == rect.left  ){
			offsetX = -2;
		}else{
			if( rect.left - first.left == -2 ){
				offsetX = 0;
			}else{
				try{
					var frame = element.ownerDocument.parentWindow.frameElement;
					if( frame ){
						var frameBorder = frame.frameBorder.toLowerCase();
						if( frameBorder == "" ){
							if( frame.parentElement.tagName.toLowerCase() == "frameset" ){
								var parentFrameBorder = frame.parentElement.frameBorder.toLowerCase();
								if( parentFrameBorder == "" ){
									offsetX = -2;
								}else if( ( parentFrameBorder == "1" || parentFrameBorder == "yes" ) && frame.parentElement.border == "" ){
									offsetX = -2;
								}else{
									offsetX = 0;
								}
							}else{
								offsetX = -2;
							}
						}else if( frameBorder == "1" || frameBorder == "yes" ){
							offsetX = -2;
						}else if( frameBorder == "0" || frameBorder == "no" ){
							offsetX = 0;
						}else{
							offsetX = -2;
						}
					}else{
						offsetX = -2;
					}
				}catch( e ){
					offsetX = -2;
				}
			}
		}
		if( first.top == rect.top  ){
			offsetY = -2;
		}else{
			if( rect.top - first.top == -2 ){
				offsetY = 0;
			}else{
				try{
					var frame = element.ownerDocument.parentWindow.frameElement;
					if( frame ){
						var frameBorder = frame.frameBorder.toLowerCase();
						if( frameBorder == "" ){
							if( frame.parentElement.tagName.toLowerCase() == "frameset" ){
								var parentFrameBorder = frame.parentElement.frameBorder.toLowerCase();
								if( parentFrameBorder == "" ){
									offsetY = -2;
								}else if( ( parentFrameBorder == "1" || parentFrameBorder == "yes" ) && frame.parentElement.border == "" ){
									offsetY = -2;
								}else{
									offsetY = 0;
								}
							}else{
								offsetY = -2;
							}
						}else if( frameBorder == "1" || frameBorder == "yes" ){
							offsetY = -2;
						}else if( frameBorder == "0" || frameBorder == "no" ){
							offsetY = 0;
						}else{
							offsetY = -2;
						}
					}else{
						offsetY = -2;
					}
				}catch( e ){
					offsetY = -2;
				}
			}
		}
		if( typeof window.dialogArguments != "undefined" ){
			offsetX = offsetX + 2;
			offsetY = offsetY + 2;
		}
		pos.left = rect.left + offsetX + document.body.scrollLeft + document.documentElement.scrollLeft;
		pos.top = rect.top + offsetY + document.body.scrollTop + document.documentElement.scrollTop;
	}else{
		InfoJet_GetPosByOffset( element , pos );
	}
	return pos;
}

function InfoJet_GetPosByOffset( element , pos ){
	pos.left += element.offsetLeft;
	pos.top += element.offsetTop;
	//CID 0112 //hgzhang //2008.09.11 //Begin
	if( element.style.borderTopWidth != null && element.style.borderTopWidth.length > 0 ){
		var borderTopWidth = parseInt( element.style.borderTopWidth.replace( "pt", "" ) );
		if( !isNaN( borderTopWidth ) ){
			pos.top += borderTopWidth;
		}
	}
	//CID 0112 //hgzhang //2008.09.11 //End
	var parent = element.offsetParent;
	if( parent != null ){
		InfoJet_GetPosByOffset( parent , pos );
	}
}

function InfoJet_GetMarginBottom( element ){
	if( InfoJet_IsIE() ){
		return InfoJet_GetPixelSize( element.currentStyle.marginBottom );
	}else{
		var css = window.getComputedStyle( element , "" );
		return parseInt( css.getPropertyValue( "margin-bottom" ) );
	}
}

function InfoJet_GetStylePixelSize( element , ieProp , nsProp ){
	if( InfoJet_IsIE() ){
		var value = eval( "element.currentStyle." + ieProp );
		return InfoJet_GetPixelSize( value );
	}else{
		var css = window.getComputedStyle( element , "" );
		return parseInt( css.getPropertyValue( nsProp ) );
	}
}

function InfoJet_GetPixelSize( size ){
	if( size.indexOf( "pt" ) > 0 ){
		if( isNaN( parseInt( size ) ) ){
			return 0;
		}else{
			return parseInt( size ) * 2;
		}
	}else{
		if( isNaN( parseInt( size ) ) ){
			return 0;
		}else{
			return parseInt( size );
		}
	}
}

function InfoJet_GetBodyClientLeft(){
	if( document.body.clientLeft ){
		return document.body.clientLeft + 2;
	}else{
		return 2 + 2;
	}
}

function InfoJet_GetBodyClientTop(){
	if( document.body.clientTop ){
		return document.body.clientTop + 5;
	}else{
		return 2 + 5;
	}
}

function InfoJet_UpdateField( control ){
	InfoJet_Changed = true;
	var fieldId = "xdoc" + InfoJet_GetElementId( control );
	var xmlField = document.getElementById( fieldId  );
	if(!xmlField)return;
	var tagName = control.tagName.toLowerCase();
	if( tagName == "select" ){
		xmlField.value = control.value;
	}else if( tagName == "img" ){
		xmlField.value = control.src;
	}else if( tagName == "input" ){
		var type = control.type.toLowerCase();
		if( type == "text" || type == "password" ){
			//Check xml_value first, xml_value is used for the formatting field.
			var xmlValue = control.getAttribute( "xml_value" );
			if( xmlValue != null ){
				xmlField.value = xmlValue;
			}else{
				//If there is no xml_value, use the control value directly.
				xmlField.value = control.value;
			}
		}else if( type == "checkbox" ){
			if( control.checked ){
				//CID 0125 //hgzhang //2008.09.28 //Begin
				xmlField.value = InfoJet_GetOnOffValue( control, true );
				//CID 0125 //hgzhang //2008.09.28 //End
			}else{
				//CID 0125 //hgzhang //2008.09.28 //Begin
				xmlField.value = InfoJet_GetOnOffValue( control, false );
				//CID 0125 //hgzhang //2008.09.28 //End
			}
		}else if( type == "radio" ){
			if( control.checked ){
				//CID 0125 //hgzhang //2008.09.28 //Begin
				xmlField.value = InfoJet_GetOnOffValue( control, true );
				//CID 0125 //hgzhang //2008.09.28 //End
			}
		}
	}else if( tagName == "textarea" ){
		//CID 0092 //hgzhang //2008.08.14 //Begin
		var xmlValue = control.getAttribute( "xml_value" );
		if( xmlValue != null ){
			xmlField.value = xmlValue;
		}else{
		//CID 0092 //hgzhang //2008.08.14 //End
			xmlField.value = control.value;
		}
	}else{
		//CID 0045 //hgzhang //2008.07.24 //Begin
		xmlField.value = control.innerHTML;
		//CID 0045 //hgzhang //2008.07.24 //End
	}
	InfoJet_UpdateXDocumentDOM( xmlField );
}

//CID 0125 //hgzhang //2008.09.28 //Begin
function InfoJet_GetOnOffValue( control, isOn ){
	var attr = null;
	if( isOn ){
		attr = InfoJet_XdPrefix + "onValue";
	}else{
		attr = InfoJet_XdPrefix + "offValue";
	}
	var value = control.getAttribute( attr );
	if( value != null ){
		return value;
	}else{
		return "";
	}
}
//CID 0125 //hgzhang //2008.09.28 //End

function InfoJet_HideOverBorderArrow(){
	InfoJet_HideBorder( "xdoc_field_over" );
	InfoJet_HideBorder( "xdoc_item_over" );
	//CID 0010 //hgzhang //2008.06.05 //Begin
	//InfoJet_HideOverMenuArrow();
	//CID 0010 //hgzhang //2008.06.05 //End
}

function InfoJet_HideFocusBorderArrow(){
	InfoJet_HideBorder( "xdoc_field_focus" );
	InfoJet_HideBorder( "xdoc_item_focus" );
	InfoJet_HideFocusMenuArrow();	
}

function InfoJet_SelectTextControlPlaceHolder( control ){
	var ghosted = control.getAttribute( InfoJet_XdPrefix + "ghosted" );
	if( ghosted != null && ghosted == "true" ){
		control.createTextRange().select();
	}
}

function InfoJet_DisableContextMenu( event ){
	event = InfoJet_GetEvent( event );
	event.cancelBubble = true;
	event.returnValue = false;
}

function InfoJet_OnControlChange( event , control ){
	InfoJet_MoveProgress2ControlPosition( control );
	InfoJet_TrimByMaxLength( control );
	var schemaPostback = InfoJet_SchemaFormat( control );
	InfoJet_UseAjax = 'sync'; //20120525 benson
	if( InfoJet_UseAjax != "none" ){	//CID 0134 //hgzhang //2008.10.05 //none
		var logicTags = control.getAttribute( "logic_tags" );
		if( logicTags != null && logicTags.length > 0 ){
			InfoJet_AJAXonField( control, logicTags );
			return;
		}
		var isDuplicateId = control.getAttribute( "duplicate_id" );
		if( isDuplicateId != null && isDuplicateId == "yes" ){
			if( !InfoJet_IsRadioButton( control ) ){
				InfoJet_AJAXonField( control, null );
				return;
			}
		}
		var isServerControl = control.getAttribute( "server_control" );
		if( isServerControl == null || isServerControl == "yes" ){
			InfoJet_AJAXonField( control, null );
			return;
		}
	
		if( schemaPostback ){
			InfoJet_AJAXonField( control, null );
			return;
		}
	}else{
		var logicTags = control.getAttribute( "logic_tags" );
		if( logicTags != null && logicTags.length > 0 ){
			InfoJet_RefreshAfaterUpdate( control );
			return;
		}
		var isDuplicateId = control.getAttribute( "duplicate_id" );
		if( isDuplicateId != null && isDuplicateId == "yes" ){
			if( !InfoJet_IsRadioButton( control ) ){
				InfoJet_ValueChange( control );
				return;
			}
		}
		var isServerControl = control.getAttribute( "server_control" );
		if( isServerControl == null || isServerControl == "yes" ){
			InfoJet_ValueChange( control );
			return;
		}
	
		if( schemaPostback ){
			InfoJet_ValueChange( control );
			return;
		}
	}
}

function InfoJet_SchemaFormat( control ){
	//InfoJet_SchemaFormat返回值,标识是否需要post-back(InfoJet_ValueChange).
	//在InfoJet_SchemaFormat中已经调用过InfoJet_XmlValueFormatted和InfoJet_UpdateField,InfoJet_OnControlChange中不需要再调用.
	var schemaType = control.getAttribute( "schema_type" );
	if( schemaType == "unknown" ){
		//Schema未知,post-back
		InfoJet_XmlValueFormatted( false );
		InfoJet_UpdateField( control );
		return true;
	}
	var dataFmtResult = InfoJet_DataFmt( control );
	if( dataFmtResult == 0 ){
		//不支持的格式,post-back
		InfoJet_XmlValueFormatted( false );
		InfoJet_UpdateField( control );
		return true;
	}else if( dataFmtResult == 1 ){
		//支持的格式
		var schemaNillable = control.getAttribute( "schema_nillable" );
		var controlValue = InfoJet_GetControlValue( control );
		if( controlValue == null ){
			return false;
		}
		if( controlValue.length > 0 ){
			if( schemaNillable == "true" ){
				InfoJet_RemoveError( control.id, 'schema' );
				InfoJet_HideError( control.id );
			}else{
				if( InfoJet_CheckSchemaLength( control ) ){
					InfoJet_RemoveError( control.id, 'schema' );
					InfoJet_HideError( control.id );
				}else{
					InfoJet_AddSchemaError( control.id );
					InfoJet_ShowSchemaError( control.id );
				}
			}
		}else{
			if( schemaNillable == "true" ){
				InfoJet_RemoveError( control.id , 'schema' );
				InfoJet_HideError( control.id  );
			}else{
				if( schemaType == "string" || schemaType == "anyURI" ){
					if( InfoJet_CheckSchemaLength( control ) ){
						InfoJet_RemoveError( control.id, 'schema' );
						InfoJet_HideError( control.id );
					}else{
						InfoJet_AddSchemaError( control.id );
						InfoJet_ShowSchemaError( control.id );
					}
				}else{ // "" is invalidate for other schema type fields
					InfoJet_AddSchemaError( control.id );
					InfoJet_ShowSchemaError( control.id );
				}
			}
		}
		InfoJet_XmlValueFormatted( true );
		InfoJet_UpdateField( control );
		if( InfoJet_IsTextControl( control ) ){
			InfoJet_OnTextControlChange( control );
		}
		return false;
	}else{ // -1
		//错误的格式
		InfoJet_AddSchemaError( control.id );
		InfoJet_ShowSchemaError( control.id );
		
		InfoJet_XmlValueFormatted( false );
		InfoJet_UpdateField( control );
		return false;
	}
	return false;
}

function InfoJet_XmlValueFormatted( formatted )
{
	if( formatted ){
		document.getElementById( "xdoc_param_xml_value_formatted" ).value = "1";
	}else{
		document.getElementById( "xdoc_param_xml_value_formatted" ).value = "0";
	}
}

function InfoJet_IsRadioButton( control ){
	var tagName = control.tagName.toLowerCase();
	if( tagName == "input" ){
		var type = control.type.toLowerCase();
		if( type == "radio" ){
			return true;
		}
	}
	return false;
}

function InfoJet_GetControlValue( control ){
	var fieldId = "xdoc" + InfoJet_GetElementId( control );
	var tagName = control.tagName.toLowerCase();
	if( tagName == "select" ){
		return control.value;
	}else if( tagName == "img" ){
		return control.src;
	}else if( tagName == "input" ){
		var type = control.type.toLowerCase();
		if( type == "text" || type == "password" ){
			return control.value;
		}else if( type == "checkbox" ){
			if( control.checked ){
				//CID 0125 //hgzhang //2008.09.28 //Begin
				return InfoJet_GetOnOffValue( control, true );
				//CID 0125 //hgzhang //2008.09.28 //End
			}else{
				//CID 0125 //hgzhang //2008.09.28 //Begin
				return InfoJet_GetOnOffValue( control, false );
				//CID 0125 //hgzhang //2008.09.28 //End
			}
		}else if( type == "radio" ){
			if( control.checked ){
				//CID 0125 //hgzhang //2008.09.28 //Begin
				return InfoJet_GetOnOffValue( control, true );
				//CID 0125 //hgzhang //2008.09.28 //End
			}
		}
	}else if( tagName == "textarea" ){
		return control.value;
	}else{
		//CID 0045 //hgzhang //2008.07.24 //Begin
		return control.innerHTML
		//CID 0045 //hgzhang //2008.07.24 //End
	}
}

function InfoJet_CheckSchemaLength( control ){
	var checkMinLength = true;
	var checkMaxLength = true;
	var minLengthValue = control.getAttribute( "schema_minLength" );
	if( minLengthValue != null && minLengthValue.length > 0 ){
		if( minLengthValue != "unbounded" ){
			var minLength = parseInt( minLengthValue );
			if( control.value.length < minLength ){
				checkMinLength = false;
			}
		}
	}
	var maxLengthValue = control.getAttribute( "schema_maxLength" );
	if( maxLengthValue != null && maxLengthValue.length > 0 ){
		if( maxLengthValue != "unbounded" ){
			var maxLength = parseInt( maxLengthValue );
			if( control.value.length > maxLength ){
				checkMaxLength = false;
			}
		}
	}
	return checkMinLength && checkMaxLength;
}

function InfoJet_OnTextControlChange( textControl ){
	var ghosted = textControl.getAttribute( InfoJet_XdPrefix + "ghosted" );
	if( ghosted != null && ghosted == "true" ){
		textControl.setAttribute( InfoJet_XdPrefix + "ghosted" , "false" );
	}
}

function InfoJet_OnLinkedPictureClick( event , linkedPicture ){
	if( typeof(InfoJetCustom_OnLinkedPictureClick) != "undefined" ){
		eval( "InfoJetCustom_OnLinkedPictureClick( event , linkedPicture );" );
	}else{
		var src = window.prompt( "Please input the picture's URL:" , "" );
		if( src != null ){
			linkedPicture.src = src;
			InfoJet_UpdateField( linkedPicture );
		}
	}
}

function InfoJet_OnInlinePictureClick( event, inlinePicture ){
	//CID 0002 //hgzhang //2008.06.04 //Begin
	var disableEditing = inlinePicture.getAttribute( InfoJet_XdPrefix + "disableEditing" );
	if( disableEditing != null && disableEditing.toLowerCase() == "yes" ){
		return;
	}
	//CID 0002 //hgzhang //2008.06.04 //End
	if( typeof(InfoJetCustom_OnInlinePictureClick) != "undefined" ){
		//CID 0033 //hgzhang //2008.06.28 //Begin
		var formId = document.getElementById( "xdoc_param_form_id" ).value;
		eval( "InfoJetCustom_OnInlinePictureClick( event , inlinePicture, formId );" );
		//CID 0033 //hgzhang //2008.06.28 //End
	}else{
		//CID 0033 //hgzhang //2008.06.28 //Begin
		var formId = document.getElementById( "xdoc_param_form_id" ).value;
		//CID 0030 //hgzhang //2008.07.14 //Begin
		var uploadedPicture = window.showModalDialog( InfoJet_WebContext + "js/uploadpicture_dialog.htm", new Array( window, inlinePicture, formId ), 'dialogWidth:470px;dialogHeight:150px;help:no;' );
		if( uploadedPicture != null ){  
			InfoJet_LinkUploadedPicture( inlinePicture, uploadedPicture );
		}
		//CID 0030 //hgzhang //2008.07.14 //End
		//CID 0033 //hgzhang //2008.06.28 //End
	}
}

//CID 0030 //hgzhang //2008.07.14 //Begin
function InfoJet_LinkUploadedPicture( inlinePicture, uploadedPicture ){
	if( inlinePicture.src == null )
	{
		inlinePicture = document.getElementById( pureId + ',1' );
	}
	var linkPath = uploadedPicture.path;
	inlinePicture.src = linkPath;
	var pureId = InfoJet_GetPureId( inlinePicture.id );
	var file = document.getElementById( 'xdoc' + pureId );
	if( file != null )
	{
		file.value = uploadedPicture.content;
	}
	var xdocForm = document.getElementById( 'xdoc_form' );
	var fileLink = document.getElementById( pureId + '_link' );
	if( fileLink != null )
	{
		fileLink.value = linkPath;
	}
	else
	{
		var linkHtml = '<input type=hidden id=' + pureId  + '_link name=' + pureId + '_link value=' + linkPath + '>';
		InfoJet_InsertAdjacentHTMLBeforeEnd( xdocForm, linkHtml );
	}
}
//CID 0030 //hgzhang //2008.07.14 //End

//CID 0009 //hgzhang //2008.06.03 //Begin
var InfoJet_SaveAsWindow = null;
//CID 0009 //hgzhang //2008.06.03 //End

function InfoJet_OnMenuClick( event , menu ){
	if( menu.getAttribute( "type" ) == "group" ){
		return;
	}
	InfoJet_HiddenAllGroupMenu();
	var menuArrow = document.getElementById( "xdoc_menu_focus_arrow" );
	menuArrow.style.display = "none";
	
	var action = menu.getAttribute( "action" );
	var component = menu.getAttribute( "component" );
	if( action != null ){
		if( action == "switchView" ){
			var viewId = menu.getAttribute( "component" );
			InfoJet_DoSwitchView( viewId );
		}else if( action == "noErrorFormatting" ){
			InfoJet_CheckErrorFormatting( menu );
		}else if( action == "printableVersion" ){
			InfoJet_OpenExportedMHT( null );
		}else if( action == "attach" && component == "xFileAttachment" ){
			var itemId = menuArrow.getAttribute( "itemId" );
			var fileLink = document.getElementById( itemId );
			InfoJet_AttachFile( fileLink );
			InfoJet_OnFocus( event, fileLink, "control" );
		}else if( action == "open" && component == "xFileAttachment" ){
			var itemId = menuArrow.getAttribute( "itemId" );
			var fileLink = document.getElementById( itemId );
			if( fileLink.href == null ){
				//try again for duplicate binding.
				fileLink = document.getElementById( itemId + ",1" );
			}
			if( fileLink != null ){
				//CID 0022 //hgzhang //2008.06.23 //Begin
				var href = fileLink.href;
				if( href == "javascript:void(0)" ){
					href = fileLink.fileHref;
				}
				if( href != null && href != "javascript:void(0)" ){                           //CID 0023 //hgzhang //2008.06.19 //if
					window.open( href);
				}
				//CID 0022 //hgzhang //2008.06.23 //End
			}
		}else if( action == "saveAs" && component == "xFileAttachment" ){
			var itemId = menuArrow.getAttribute( "itemId" );
			var fileLink = document.getElementById( itemId );
			if( fileLink.href == null ){
				//try again for duplicate binding.
				fileLink = document.getElementById( itemId + ",1" );
			}
			if( fileLink != null ){
				//CID 0023 //hgzhang //2008.06.19 //Begin
				//CID 0022 //hgzhang //2008.06.23 //Begin
				var href = fileLink.href;
				if( href == "javascript:void(0)" ){
					href = fileLink.fileHref;
				}
				if( href != null && href != "javascript:void(0)" ){
				//CID 0022 //hgzhang //2008.06.23 //End
					if( InfoJet_SaveAsPage != null ){
						window.open( InfoJet_SaveAsPage + "?file=" + href );                   //CID 0022 //hgzhang //2008.06.23 //href
					}else{
					//CID 0023 //hgzhang //2008.06.19 //End
						InfoJet_SaveAsWindow = window.open( href );                            //CID 0022 //hgzhang //2008.06.23 //href
						try{
							//CID 0009 //hgzhang //2008.06.04 //Begin
							if( InfoJet_IsImage( href ) ){                                     //CID 0022 //hgzhang //2008.06.23 //href
								//CID 0009 //hgzhang //2008.06.03 //Begin
								window.setTimeout( "if( InfoJet_SaveAsWindow != null ){ InfoJet_SaveAsWindow.document.execCommand( 'SaveAs' ); }", 1000 );
								//CID 0009 //hgzhang //2008.06.03 //End
							}else{
								InfoJet_SaveAsWindow.document.execCommand( 'SaveAs' );
							}
							//CID 0009 //hgzhang //2008.06.04 //End
						}catch(e){}
					}
				}
			}
		}else if( action == "remove" && component == "xFileAttachment" ){
			var itemId = menuArrow.getAttribute( "itemId" );
			var fileLink = document.getElementById( itemId );
			if( fileLink.href == null ){
				//try again for duplicate binding.
				fileLink = document.getElementById( itemId + ",1" );
			}
			if( fileLink != null ){
				InfoJet_RemoveFile( fileLink );
				InfoJet_OnFocus( event, fileLink, "control" );
			}
		}else{
			var itemId = menuArrow.getAttribute( "itemId" );
			var xmlToEditName = menu.getAttribute( "xmlToEdit" );
			var xmlToEditAction = menu.getAttribute( "component" ) + "::" + menu.getAttribute( "action" );
			InfoJet_DoXmlToEditAction( itemId , xmlToEditName , xmlToEditAction );		
		}
	}
}

//CID 0009 //hgzhang //2008.06.04 //Begin
function InfoJet_IsImage( href ){
	var slashIndex = href.lastIndexOf('.');
	if( (slashIndex > 0) && (slashIndex < href.length -1) ){
		var fileExt = href.substr( slashIndex + 1 ).toLowerCase();
		if( fileExt == "gif" || fileExt == "jpg" || fileExt == "bmp" || fileExt == "emf" || fileExt == "exif" || fileExt == "icon" || fileExt == "png" || fileExt == "tiff" || fileExt == "wmf" ){
			return true;
		}
	}
	return false;
}
//CID 0009 //hgzhang //2008.06.04 //Begin

function InfoJet_OnMenuArrowPoint( event , source , type ){
	event = InfoJet_GetEvent( event );
	if( type == "arrow" ){
		var menuArrow = document.getElementById( "xdoc_menu_focus_arrow" );
		source = document.getElementById( menuArrow.getAttribute( "itemId" ) );
	}
	return InfoJet_ShowContextMenu( event , source , type );
}

function InfoJet_OnContextMenu( event , source ){
	if( !InfoJet_ReplaceBrowserContextMenu ){
		event.cancelBubble = true;
		event.returnValue = true;
		return true;
	}
	
	InfoJet_HiddenAllGroupMenu();
	if( source.disabled ){
		//如果事件源被disabled了,使用默认ContextMenu.
		event.cancelBubble = true;
		event.returnValue = true;
		return true;
	}
	event = InfoJet_GetEvent( event );
	var tagName = source.tagName.toLowerCase();
	if( tagName != "div" && tagName != "table" && tagName != "tr" && tagName != "td" ){
		var xctname = source.getAttribute( InfoJet_XdPrefix + "xctname" );
		if( !(xctname != null && xctname == "FileAttachment") ){
			//文本框,图片,Link使用默认ContextMenu.
			event.cancelBubble = true;
			event.returnValue = true;
			return true;
		}
	}
	InfoJet_OnFocus( event , source , "common" );
	return InfoJet_ShowContextMenu( event , source , "arrow" );		
}

function InfoJet_ShowContextMenu( event , source , type ){
	var itemElement = InfoJet_RefreshXmlToEditItem( source , true );
	var itemId = "";
	if( itemElement != null ){
		itemId = itemElement.id;
	}
	var contextIds = new Array();
	if( type == "arrow" ){
		InfoJet_GetMenuContextIds( contextIds , source );
	}else if( type == "point" ){
		contextIds[ contextIds.length ] = document.getElementById( "xdoc_data_root_element_id" ).innerHTML;
	}
	if( contextIds.length >= 1 ){
		InfoJet_HiddenAllGroupMenu();
		var menuCount = InfoJet_ShowMenuByContext( "" , contextIds , itemId, type );
		var xdocMenu = document.getElementById( "xdoc_menu" );
		if( menuCount > 0 ){
			var viewId = document.getElementById( "xdoc_param_view_id" ).value;
			var xdocMenu = document.getElementById( "xdoc.contextmenu.group" + viewId );
			var left = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			var top = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			xdocMenu.style.left = left;
			xdocMenu.style.top = top;
			xdocMenu.style.display = "block";
			InfoJet_HideSelects( xdocMenu, left, top );
			event.cancelBubble = true;
			event.returnValue = false;
		}
		return false;
	}else{
		return true;
	}
}

var InfoJet_Selects = null;

function InfoJet_HideSelects( xdocMenu, left, top ){
	if( window.XMLHttpRequest ){ //IE7
		return;
	}
	
	InfoJet_Selects = new Array();

	var menuX1 = left;
	var menuY1 = top;
	var menuX2 = left + xdocMenu.offsetWidth;
	var menuY2 = top + xdocMenu.offsetHeight;
	
	var selects = document.getElementsByTagName("select");
	for (var i = 0; i < selects.length; i ++) {
		var select = selects[i];
		
		var pos = InfoJet_GetPos( select );
		var selectX1 = pos.left;
		var selectY1 = pos.top;
		var selectX2 = pos.left + select.offsetWidth;
		var selectY2 = pos.top + select.offsetHeight;
		
		if( !((menuX1 > selectX2) || (selectX1 > menuX2) || (menuY1 > selectY2) || (selectY1 > menuY2)) ){
			var visibility = select.style.visibility;
			if (!visibility) {
				visibility = select.currentStyle.visibility;
			}
			select.setAttribute( "InfoJet_Visibility", visibility );
			select.style.visibility = "hidden";
			InfoJet_Selects[ InfoJet_Selects.length ] = select;
		}
	}
}

function InfoJet_ShowSelects(){
	if( window.XMLHttpRequest ){ //IE7
		return;
	}
	
	if( InfoJet_Selects != null ){
		for( var i = 0; i < InfoJet_Selects.length; i ++ ){
			var select = InfoJet_Selects[ i ];
			select.style.visibility = select.getAttribute( "InfoJet_Visibility" );
		}
	}
	InfoJet_Selects = null;
}

function InfoJet_GetMenuContextIds( contextIds , source ){
	if( source == null || source.id == "xdoc_view" ){
		return;
	}
	var id = InfoJet_GetElementId( source );
	if( id != null && id.indexOf( "_0_" ) == 0 ){
		contextIds[ contextIds.length ] = id;
	}
	InfoJet_GetMenuContextIds( contextIds , InfoJet_GetParent( source ) );
}

function InfoJet_ShowMenuByContext( baseId , contextIds , itemId, type ){
	var viewId = document.getElementById( "xdoc_param_view_id" ).value;
	var menuCount = 0;
	for( var i = 0 ; true ; i ++ ){
		var id = baseId + i;
		var menuId = id + ".menu" + viewId;
		var menu = document.getElementById( menuId );
		if( menu != null ){
			var action = menu.getAttribute( "action" );
			var isSeparator = ( action != null ) && ( action == "none" );
			var isSwitchView = ( action != null ) && ( action == "switchView" );
			var isPrintableVersion = ( action != null ) && ( action == "printableVersion" );
			var InfoJet_NoErrorFormatting = ( action != null ) && ( action == "noErrorFormatting" );
			if( isSeparator && menuCount > 0 ){
				menu.style.display = "block";
			}else if( InfoJet_IsShowMenu( menu , contextIds, itemId ) ){
				menu.style.display = "block";
				menuCount ++;
				var groupId = id + ".group" + viewId;
				if( document.getElementById( groupId ) != null ){
					var subMenuCount = InfoJet_ShowMenuByContext( id + "." , contextIds, itemId, type );
					if( subMenuCount <= 0 ){
						menu.style.display = "none";
						menuCount --
					}
				}
			}else if( isSwitchView || isPrintableVersion || InfoJet_NoErrorFormatting ){
				menu.style.display = "block";
				menuCount ++;
			}else{
				menu.style.display = "none";
			}
		}else{
			break;
		}
	}
	return menuCount;
}

function InfoJet_IsShowMenu( menu , contextIds, itemId ){
	if( menu.getAttribute( "type" ) == "group" ){
		return true;
	}
	var contextId = contextIds[ 0 ];
	var xmlToEdit = menu.getAttribute( "xmlToEdit" );
	var component = menu.getAttribute( "component" );
	//CID 0108 //hgzhang //2008.09.01 //Begin
	var xmlToEditDisabled = component + "-" + xmlToEdit + "-editing: disabled"
	var parent = InfoJet_GetParent(InfoJet_ItemElement);
	while( parent != null ){
		var style = parent.style.cssText;
		if( style != null && style.indexOf( xmlToEditDisabled ) > 0 )
		{
			return false;
		}
		parent = InfoJet_GetParent(parent);
		if( parent != null && parent.id == "xdoc_view" ){
			break;
		}
	}
	//CID 0108 //hgzhang //2008.09.01 //End
	var action = menu.getAttribute( "action" );
	if( component == "xReplace" ){
		if( action == "replace" ){
			var containerIdArray = document.getElementById( xmlToEdit + "_container" ).innerHTML;
			if( InfoJet_IsArrayIdInContextIds( containerIdArray , contextIds ) &&
				InfoJet_IsIdInArray( contextId , xmlToEdit + "_item" ) ){
				return true;
			}else{
				return false;
			}
		}
	}else if( component == "xOptional" ){
		if( action == "insert" ){
			if( InfoJet_IsIdInArray( contextId , xmlToEdit + "_container"  ) &&
				InfoJet_IdArrayIdCount( xmlToEdit + "_item" ) <= 0 ){
				return true;
			}else{
				return false;
			}
		}else if( action == "remove" ){
			var containerIdArray = document.getElementById( xmlToEdit + "_container" ).innerHTML;
			if( InfoJet_IsArrayIdInContextIds( containerIdArray , contextIds ) &&
				InfoJet_IsIdInArray( contextId , xmlToEdit + "_item" ) ){
				return true;
			}else{
				return false;
			}
		}
	}else if( component == "xCollection" ){
		if( action == "insert" ){
			if( InfoJet_IsIdInArray( contextId , xmlToEdit + "_container"  ) ){
				return true;
			}else{
				return false;
			}
		}else if( action == "insertBefore" ){
			var containerIdArray = document.getElementById( xmlToEdit + "_container" ).innerHTML;
			if( InfoJet_IsArrayIdInContextIds( containerIdArray , contextIds ) &&
				InfoJet_IsIdInArray( contextId , xmlToEdit + "_item" ) ){
				return true;
			}else{
				return false;
			}
		}else if( action == "insertAfter" ){
			var containerIdArray = document.getElementById( xmlToEdit + "_container" ).innerHTML;
			if( InfoJet_IsArrayIdInContextIds( containerIdArray , contextIds ) &&
				InfoJet_IsIdInArray( contextId , xmlToEdit + "_item" ) ){
				return true;
			}else{
				return false;
			}
		}else if( action == "remove" ){
			var containerIdArray = document.getElementById( xmlToEdit + "_container" ).innerHTML;
			if( InfoJet_IsArrayIdInContextIds( containerIdArray , contextIds ) &&
				InfoJet_IsIdInArray( contextId , xmlToEdit + "_item" ) ){
				return true;
			}else{
				return false;
			}
		}else if( action == "removeAll" ){
			if( InfoJet_IsIdInArray( contextId , xmlToEdit + "_container"  ) && 
				InfoJet_IdArrayIdCount( xmlToEdit + "_item" ) > 0 ){
				return true;
			}else{
				return false;
			}		
		}
	}else if( component == "xFileAttachment" ){
		//CID 0002 //hgzhang //2008.05.29 //Begin
		var fileAttachmentSpan = InfoJet_GetParent( document.getElementById( itemId ) );
		//CID 0002 //hgzhang //2008.05.29 //End
		itemId = InfoJet_GetPureId( itemId );
		if( InfoJet_IsIdInArray( itemId, xmlToEdit + "_item" ) ){
			//CID 0002 //hgzhang //2008.05.29 //Begin
			//CID 0007 //hgzhang //2008.06.10 //Begin
			if( fileAttachmentSpan == null || fileAttachmentSpan.getAttribute( InfoJet_XdPrefix + "disableEditing" ) == null ){
				fileAttachmentSpan = InfoJet_GetParent( document.getElementById( itemId + ",1" ) );
			}
			//CID 0007 //hgzhang //2008.06.10 //End
			if( fileAttachmentSpan != null ){
				var disableEditing = fileAttachmentSpan.getAttribute( InfoJet_XdPrefix + "disableEditing" );
				if( disableEditing != null && disableEditing.toLowerCase() == "yes" ){
					if( action == "attach" || action == "remove" ){
						return false;
					}
				} 
			} 
			//CID 0002 //hgzhang //2008.05.29 //End
			return true;
		}else{
			return false;
		}
	}
	return false;
}

function InfoJet_IsArrayIdInContextIds( idArray , contextIds ){
	var ids = idArray.split( ";" );
	for( var i = 0 ; i < ids.length ; i ++ ){
		var id = ids[ i ];
		for( var c = 0 ; c < contextIds.length ; c ++ ){
			var contextId = contextIds[ c ];
			if( id == contextId ){
				return true;
			}
		}
	}
	return false;
}

function InfoJet_IdArrayIdCount( idArrayName ){
	var idArray = document.getElementById( idArrayName ).innerHTML;
	if( idArray.length <= 0 ){
		return 0;
	}else{
		if( idArray.indexOf( ";" ) ){
			return 1;
		}else{
			var ids = idArray.split( ";" );
			return ids.length;	
		}
	}
}


function InfoJet_OnClick( event , source , type ){
	InfoJet_HiddenAllGroupMenu();
	InfoJet_HideBorder( "xdoc_item_focus" );
	if( !InfoJet_BrowserQuick ){
		InfoJet_HideBorder( "xdoc_field_focus" );
	}
	event = InfoJet_GetEvent( event );
	//CID 0086 //hgzhang //2008.08.14 //Begin
	InfoJet_OnFocus( event , source , type, true );
	//CID 0086 //hgzhang //2008.08.14 //End
	
	//CID 0131 //hgzhang //2008.10.03 //Begin
	if( type != null && type == "control" && source.id != null && source.id.indexOf( "_0_" ) == 0 && InfoJet_IsButtonTypeInput( source ) ){
		InfoJet_OnControlChange( event, source );
	}
	//CID 0131 //hgzhang //2008.10.03 //End
}

//CID 0131 //hgzhang //2008.10.03 //Begin
function InfoJet_IsButtonTypeInput( control ){
	var tagName = control.tagName.toLowerCase();
	if( tagName == "input" ){
		var type = control.getAttribute( "type" );
		if( type != null ){
			type = type.toLowerCase();
			if( type == "checkbox" || type == "radio" ){
				return true;
			}
		}
	}
	return false;
}
//CID 0131 //hgzhang //2008.10.03 //End

function InfoJet_HiddenAllGroupMenu(){
	InfoJet_ShowSelects();
	if( InfoJet_IsInited() ){
		var viewId = document.getElementById( "xdoc_param_view_id" ).value;
		document.getElementById( "xdoc.contextmenu.group" + viewId ).style.display = "none";
	}
	return true;
}

function InfoJet_HiddenGroupMenu( baseId ){
	var viewId = document.getElementById( "xdoc_param_view_id" ).value;
	for( var i = 0 ; true ; i ++ ){
		var id = baseId + i;
		var itemMenuId = id + ".menu" + viewId;
		var itemMenu = document.getElementById( itemMenuId )
		if( itemMenu != null ){
			itemMenu.style.backgroundColor = "#FFFFFF";
			itemMenu.style.borderColor = "#FFFFFF";
			var groupId = id + ".group" + viewId;
			if( document.getElementById( groupId ) != null ){
				document.getElementById( groupId ).style.display = "none";
				InfoJet_HiddenGroupMenu( id + "." );
			}
		}else{
			break;
		}
	}
}

function InfoJet_MenuOver( event , itemMenu ){
	itemMenu.style.backgroundColor = "#C1D2EE";
	itemMenu.style.borderColor = "#316AC5";
	InfoJet_HiddenSiblingSubMenu( itemMenu );
	InfoJet_ShowSubMenuById( itemMenu.id );
}

function InfoJet_MenuOut( event , itemMenu ){
	itemMenu.style.backgroundColor = "#FFFFFF";
	itemMenu.style.borderColor = "#FFFFFF";
}

function InfoJet_HiddenSiblingSubMenu( itemMenu ){
	var viewId = document.getElementById( "xdoc_param_view_id" ).value;
	var coords = itemMenu.id.split( "." );
	var id = "";
	for( var i = 0 ; i < coords.length - 2 ; i ++ ){
		id += coords[ i ] + ".";
	}
	var siblingId = "";
	for( var i = 0 ; true ; i ++ ){
		siblingId = id + i + ".menu" + viewId;
		if( document.getElementById( siblingId ) == null ){
			break;
		}else{
			if( siblingId != itemMenu.id ){
				InfoJet_HiddenSubMenuById( siblingId );
			}
		}
	}
}

function InfoJet_HiddenSubMenuById( itemMenuId ){
	var viewId = document.getElementById( "xdoc_param_view_id" ).value;
	var id = itemMenuId.substr( 0 , itemMenuId.length - 4 - viewId.length );
	var groupMenuId = id + "group" + viewId;
	if( document.getElementById( groupMenuId ) != null ){
		document.getElementById( groupMenuId ).style.display = "none";
		for( var i = 0 ; true ; i ++ ){
			var subMenuId = id + i + ".menu" + viewId;
			if( document.getElementById( subMenuId ) != null ){
				InfoJet_HiddenSubMenuById( subMenuId );
			}else{
				break;
			}
		}
	}
}

function InfoJet_ShowSubMenuById( itemMenuId ){
	var viewId = document.getElementById( "xdoc_param_view_id" ).value;
	var itemMenu = document.getElementById( itemMenuId );
	var groupMenuId = itemMenuId.substr( 0 , itemMenuId.length - 4 - viewId.length ) + "group" + viewId;
	var subMenu = document.getElementById( groupMenuId );
	if( subMenu != null ){
		var pos = InfoJet_GetPos( itemMenu );
		subMenu.style.display = "block";
		if( InfoJet_IsIE() ){
			subMenu.style.left = pos.left + itemMenu.offsetWidth;
			subMenu.style.top = pos.top - 2;
		}else{
			subMenu.style.left = pos.left + itemMenu.offsetWidth + 4;
			subMenu.style.top = pos.top;
		}
	}
}

function InfoJet_ResetSwitchViewMenuCheck(){
	var viewId = document.getElementById( "xdoc_param_view_id" ).value;
	for( var i = 0 ; true ; i ++ ){
		var menuId = i + ".menu" + viewId;
		var menu = document.getElementById( menuId );
		if( menu != null ){
			var component = menu.getAttribute( "component" );
			if( component != null && component.length > 0 ){
				var checkId = i + ".check" + viewId;
				var check = document.getElementById( checkId );
				if( component == viewId ){
					check.innerHTML = "<div align='center'><img src='" + InfoJet_WebContext + "images/infojet_menu_check.gif'></img></div>"
				}else{
					check.innerHTML = "";
				}
			}
		}else{
			break;
		}
	}
}

function InfoJet_CheckErrorFormatting( menu ){
	InfoJet_NoErrorFormatting = !InfoJet_NoErrorFormatting;
	
	var checkId = menu.id.replace( "menu" , "check" );
	var check = document.getElementById( checkId );
	if( check != null ){
		if( InfoJet_NoErrorFormatting ){
			check.innerHTML = "<div align='center'><img src='" + InfoJet_WebContext + "images/infojet_menu_check.gif'></img></div>";
			InfoJet_HideAllErrors();
		}else{
			check.innerHTML = "";
			InfoJet_ShowAllErrors();
		}
	}
}

var InfoJet_ItemElement = null;

//CID 0080 //hgzhang //2008.08.03 //Begin
var InfoJet_ActiveElement = null;
var InfoJet_ActiveElementId = null;
var InfoJet_TextStart = 0;
var InfoJet_TextEnd = 0;
//CID 0080 //hgzhang //2008.08.03 //End

function InfoJet_OnFocus( event , source , type, clicked ){	//CID 0086 //hgzhang //2008.08.14 //clicked
	if( (!InfoJet_IsInited()) && (source.id == "") ){
		return;
	}
	event = InfoJet_GetEvent( event );
	
	//CID 0080 //hgzhang //2008.08.04 //Begin
	if( !clicked ){		 //CID 0086 //hgzhang //2008.08.14 //if
		InfoJet_Try2ShowModalScreen(source);
	}
	//CID 0080 //hgzhang //2008.08.04 //End
	
	if( type == "control" && InfoJet_NeedFieldBorder( source ) ){
		InfoJet_ShowFieldBorder( source , "xdoc_field_focus" );
		InfoJet_SelectTextControlPlaceHolder( source );
	}
	if( !InfoJet_NeedSectionBorder( source ) ){
		var parent = InfoJet_GetParent( source );
		if( parent != null ){
			InfoJet_OnFocus( event , parent , type );
		}
		return;
	}
	InfoJet_HideFocusBackground();
	var itemElement = InfoJet_RefreshXmlToEditItem( source , true );
	if( itemElement != null ){
		InfoJet_ItemElement = itemElement;
		InfoJet_ShowFocusMenuArrow( itemElement );
		InfoJet_ShowSectionBorder( itemElement , "xdoc_item_focus" );
		if( type == "control" ){
			InfoJet_HideFocusBackground();
		}else{
			InfoJet_ShowFocusBackground( itemElement );
		}
		event.cancelBubble = true;
	}else{
		InfoJet_HideFocusMenuArrow();
	}
	InfoJet_OnMasterDetial( event , source );
}

//CID 0080 //hgzhang //2008.08.04 //Begin
function InfoJet_Try2ShowModalScreen(source){
	//Save ActiveElement.
	InfoJet_ActiveElement = source;
	InfoJet_ActiveElementId = source.id;
	
	//tagName maybe is undefined in FireFox.
	if( source.tagName && source.tagName.toLowerCase() == "textarea" ){
		//CID 0086 //hgzhang //2008.08.14 //Begin
		var defaultRows = source.getAttribute( "default_rows" );
		if( defaultRows != null && defaultRows == "1" ){
			source.select();
		}else{
		//CID 0086 //hgzhang //2008.08.14 //End
			InfoJet_SaveTextPos(source);
		}
	}
	
	if( InfoJet_Progress != null && InfoJet_Progress.style.visibility == "visible" ){
		//CID 0077 //hgzhang //2008.08.03 //Begin
		if( InfoJet_ShowModalScreen && InfoJet_ModalScreen != null ){
			var xdoc = document.getElementById( "xdoc" );
			if( xdoc != null ){
				//Enlarge the modal screen, visibility will effect the text position..
				var xdocPos = InfoJet_GetPos( xdoc );
				InfoJet_ModalScreen.style.left = xdocPos.left;
				InfoJet_ModalScreen.style.top = xdocPos.top;
				InfoJet_ModalScreen.style.width = xdoc.offsetWidth;
				InfoJet_ModalScreen.style.height = xdoc.offsetHeight;
				if( InfoJet_IsIE() ){
					try{
						InfoJet_Progress.focus();
					}catch(e){}
				}else{
					InfoJet_ModalFocus.focus();
				}
			}
		}
		//CID 0077 //hgzhang //2008.08.03 //End
	}
}
//CID 0080 //hgzhang //2008.08.04 //End

//CID 0080 //hgzhang //2008.08.04 //Begin
function InfoJet_SaveTextPos(textArea){
	if( textArea.value.length == 0 ){
		InfoJet_TextStart = 0;
		InfoJet_TextEnd = 0;
		return;
	}
	InfoJet_TextStart = 0;
	InfoJet_TextEnd = 0;
	if( InfoJet_IsIE() ){
		var range = document.selection.createRange();
		if(range.parentElement().id == textArea.id){
			//InfoJet_TextStart
			var allRange = document.body.createTextRange();
			allRange.moveToElementText(textArea);
			for(InfoJet_TextStart=0; allRange.compareEndPoints("StartToStart", range) < 0; InfoJet_TextStart++){
				allRange.moveStart('character', 1);
			}
			/*
			for (var i = 0; i <= InfoJet_TextStart; i ++){
				if (textArea.value.charAt(i) == '\n'){
					InfoJet_TextStart ++;
				}
			}
			*/
			//InfoJet_TextEnd
			allRange = document.body.createTextRange();
			allRange.moveToElementText(textArea);
			for (InfoJet_TextEnd = 0; allRange.compareEndPoints('StartToEnd', range) < 0; InfoJet_TextEnd ++){
				allRange.moveStart('character', 1);
			}
			/*
			for (var i = 0; i <= InfoJet_TextEnd; i ++){
				if (textArea.value.charAt(i) == '\n'){
					InfoJet_TextEnd ++;
				}
			}
			*/
		}
	}else{
		InfoJet_TextStart = textArea.selectionStart;
		InfoJet_TextEnd = textArea.selectionEnd;
	}
}
//CID 0080 //hgzhang //2008.08.04 //End

//CID 0080 //hgzhang //2008.08.03 //Begin  
function InfoJet_RestoreTextPos(textArea){
	if( InfoJet_IsIE() ){
		try{
			var range = textArea.createTextRange();
			range.collapse(true);
			//Must call moveEnd first.
			range.moveEnd('character', InfoJet_TextEnd);
			range.moveStart('character', InfoJet_TextStart);
			range.select();
		}catch( e ){}
	}else{	
		textArea.focus();
		textArea.setSelectionRange(InfoJet_TextStart, InfoJet_TextEnd);
	}
}
//CID 0080 //hgzhang //2008.08.03 //End

function InfoJet_UpdateMasterDetial( masterName , curDetialRow ){
	var masterDetials = document.getElementById( "xdoc_param_master_detial" ).value;
	var masterDetialArray = masterDetials.split( ";" );
	for( var i = 0 ; i < masterDetialArray.length ; i ++ ){
		var masterDetial = masterDetialArray[ i ];
		if( masterDetial.length > 0 ){
			var propArray = masterDetial.split( "," );
			var name = propArray[ 0 ];
			var row = propArray[ 1 ];
			if( name == masterName ){
				if( row != curDetialRow ){
					masterDetials = masterDetials.replace( masterName + "," + row , masterName + "," + curDetialRow );
					document.getElementById( "xdoc_param_master_detial" ).value = masterDetials;
					return true;
				}
			}
		}
	}
	return false;
}

function InfoJet_GetMasterDetial( source ){
	var masterDetial = {tbody:null , tr:null };
	var tr = null;
	var masterNameAttr = InfoJet_XdPrefix + "masterName";
	var parent = source;
	while( parent != null ){
		if( parent.tagName ){
			var tagName = parent.tagName.toLowerCase();
			if( tagName == "body" || tagName == "html" ){
				return null;
			}
			if( tagName == "tr" ){
				tr = parent;
			}
			if( tagName != "table" ){	
				var masterName = parent.getAttribute( masterNameAttr );
				if( masterName != null && masterName.length > 0 ){
					masterDetial.tbody = parent;
					masterDetial.tr = tr;
					return masterDetial;
				}
			}
			parent = InfoJet_GetParent( parent );
		}else{
			return null;
		}
	}
}

function InfoJet_GetCurrentDetialRow( masterDetial ){
	var tbody = masterDetial.tbody;
	var tr = masterDetial.tr;
	if( InfoJet_IsIE() ){
		for( var i = 0 ; i < tbody.children.length ; i ++ ){
			if( tbody.children( i ) == tr ){
				return i + 1;
			}
		}
	}else{
		for( var i = 0 ; i < tbody.childNodes.length ; i ++ ){
			if( tbody.childNodes[ i ].nodeType != 3 ){
				if( tbody.childNodes[ i ] == tr ){
					return i + 1;
				}
			}
		}
	}
	return 1;
}

function InfoJet_OnMouseOver( event , source , type ){
	if( InfoJet_BrowserQuick ){
		return;
	}
	if( (!InfoJet_IsInited()) && (source.id == "") ){
		return;
	}
	event = InfoJet_GetEvent( event );
	if( type == "control" && InfoJet_NeedFieldBorder( source ) ){
		InfoJet_ShowFieldBorder( source , "xdoc_field_over" );
	}
	if( !InfoJet_NeedSectionBorder( source ) ){
		return;
	}
	var itemElement = InfoJet_RefreshXmlToEditItem( source , false );
	if( itemElement != null ){
		//CID 0010 //hgzhang //2008.06.05 //Begin
		//InfoJet_ShowOverMenuArrow( itemElement );
		//CID 0010 //hgzhang //2008.06.05 //End
		InfoJet_ShowSectionBorder( itemElement , "xdoc_item_over" );
		event.cancelBubble = true;
	}
}

function InfoJet_OnBlur( event , source , type ){
	event = InfoJet_GetEvent( event );
	if( !InfoJet_ShouldContinueBlur() ){
		return;
	}
	if( type == 'control' ){
		InfoJet_HideBorder( "xdoc_field_focus" );
	}
	InfoJet_HideFocusMenuArrow();
	InfoJet_HideBorder( "xdoc_item_focus" );
	InfoJet_HideFocusBackground();
	InfoJet_HiddenAllGroupMenu();
}

function InfoJet_OnMouseOut( event , source ){
	if( InfoJet_BrowserQuick ){
		return;
	}
	InfoJet_HideOverBorderArrow();
}

function InfoJet_ShowFocusBackground( targetElement ){
	var bakBackgroundColor = targetElement.getAttribute( "Bak_Background_Color" );
	if( bakBackgroundColor == null || bakBackgroundColor == "" ){
		bakBackgroundColor = targetElement.style.backgroundColor;
		targetElement.setAttribute( "Bak_Background_Color" , bakBackgroundColor );
		targetElement.style.backgroundColor = "#CFDCF1";
		var xdocView = document.getElementById( "xdoc_view" );
		xdocView.setAttribute( "Background_Item_Id" , targetElement.id );
	}
}

function InfoJet_HideFocusBackground(){
	var xdocView = document.getElementById( "xdoc_view" );
	var backgroundItemId = xdocView.getAttribute( "Background_Item_Id" );
	if( backgroundItemId != null && backgroundItemId != "" ){
		var itemElement = document.getElementById( backgroundItemId );
		if( itemElement != null ){
			var bakBackgroundColor = itemElement.getAttribute( "Bak_Background_Color" );
			if( bakBackgroundColor != null ){
				itemElement.style.backgroundColor = bakBackgroundColor;
				itemElement.removeAttribute( "Bak_Background_Color" );
			}
		}
	}
}


function InfoJet_BuildHorizonBorder( borderId , zOrder , width , style , color ){
	var border = "";
	border += "<img id='" + borderId + "' style='";
	border += "z-order: " + zOrder + "; ";
	border += "border-top-width: " + width + "; ";
	border += "border-top-style: " + style + "; "
	border += "border-top-color: " + color + "; ";
	border += "border-right-style: none; ";
	border += "border-bottom-style: none; ";
	border += "border-left-style: none; ";
	border += "width: 0; height: 0; left: 100; top: 100; position: absolute;";
	border += "'>";
	return border;
}

function InfoJet_BuildVerticalBorder( borderId , zOrder , width , style , color ){
	var border = "";
	border += "<img id='" + borderId + "' style='";
	border += "z-order: " + zOrder + "; ";
	border += "border-left-width: " + width + "; ";
	border += "border-left-style: " + style + "; ";
	border += "border-left-color: " + color + "; ";
	border += "border-top-style: none; ";
	border += "border-right-style: none; ";
	border += "border-bottom-style: none; ";
	border += "width: 0; height: 0; left: 100; top: 100; position: absolute;";
	border += "'>";
	return border;
} 

function InfoJet_BuildInvalidateBorder( field ){
	var content = InfoJet_BuildHorizonBorder( field.id + "_top" , 90 , "2px" , "dashed" , "#FF0000" );
	content += InfoJet_BuildHorizonBorder( field.id + "_bottom" , 90 , "2px" , "dashed" , "#FF0000" );
	content += InfoJet_BuildVerticalBorder( field.id + "_left" , 90 , "2px" , "dashed" , "#FF0000" );
	content += InfoJet_BuildVerticalBorder( field.id + "_right" , 90 , "2px" , "dashed" , "#FF0000" );
	return content;
}

function InfoJet_BuildNotBlankMark( field ){
	if( InfoJet_EnableUnderline ){
		var underline = InfoJet_BuildHorizonBorder( field.id + "_notBlank" , 90 , "1pt" , "solid" , "#FF0000" );
		return underline;
	}else{
		var redStar = "";
		redStar += "<img id='" + field.id + "_notBlank' style='";
		redStar += "z-order: 90; display:none; position: absolute;' ";
		redStar += "src='" + InfoJet_WebContext + "images/infojet_red_star.gif'";
		redStar += ">";
		return redStar;
	}
}

function InfoJet_BuildFocusOverBorder(){
	var content = InfoJet_BuildHorizonBorder( "xdoc_item_focus_top" , 96 , "1" , "dashed" , "#0033FF" );
	content += InfoJet_BuildHorizonBorder( "xdoc_item_focus_bottom" , 96 , "1" , "dashed" , "#0033FF" );
	content += InfoJet_BuildVerticalBorder( "xdoc_item_focus_left" , 96 , "1" , "dashed" , "#0033FF" );
	content += InfoJet_BuildVerticalBorder( "xdoc_item_focus_right" , 96 , "1" , "dashed" , "#0033FF" );
	
	content += InfoJet_BuildHorizonBorder( "xdoc_item_over_top" , 97 , "1" , "dashed" , "#716F64" );
	content += InfoJet_BuildHorizonBorder( "xdoc_item_over_bottom" , 97 , "1" , "dashed" , "#716F64" );
	content += InfoJet_BuildVerticalBorder( "xdoc_item_over_left" , 97 , "1" , "dashed" , "#716F64" );
	content += InfoJet_BuildVerticalBorder( "xdoc_item_over_right" , 97 , "1" , "dashed" , "#716F64" );
	
	content += InfoJet_BuildHorizonBorder( "xdoc_field_focus_top" , 96 , "1" , "solid" , "#0033FF" );
	content += InfoJet_BuildHorizonBorder( "xdoc_field_focus_bottom" , 96 , "1" , "solid" , "#0033FF" );
	content += InfoJet_BuildVerticalBorder( "xdoc_field_focus_left" , 96 , "1" , "solid" , "#0033FF" );
	content += InfoJet_BuildVerticalBorder( "xdoc_field_focus_right" , 96 , "1" , "solid" , "#0033FF" );
	
	content += InfoJet_BuildHorizonBorder( "xdoc_field_over_top" , 97 , "1" , "solid" , "#716F64" );
	content += InfoJet_BuildHorizonBorder( "xdoc_field_over_bottom" , 97 , "1" , "solid" , "#716F64" );
	content += InfoJet_BuildVerticalBorder( "xdoc_field_over_left" , 97 , "1" , "solid" , "#716F64" );
	content += InfoJet_BuildVerticalBorder( "xdoc_field_over_right" , 97 , "1" , "solid" , "#716F64" );

	var focusOver = document.getElementById( "xdoc_focusover" );
	focusOver.innerHTML = content;
}

function InfoJet_ShowFieldBorder( targetElement , borderId ){
	var pos = InfoJet_GetPos( targetElement );
	
	var borderLeft = document.getElementById( borderId + "_left" );
	if( borderLeft == null ){
		return;
	}
	borderLeft.style.left = pos.left;
	borderLeft.style.top = pos.top;
	borderLeft.style.height = targetElement.offsetHeight;
	
	var borderRight = document.getElementById( borderId + "_right" );
	borderRight.style.left = pos.left + targetElement.offsetWidth - 1;
	borderRight.style.top = pos.top;
	borderRight.style.height = targetElement.offsetHeight;
	
	var borderTop = document.getElementById( borderId + "_top" );
	borderTop.style.left = pos.left;
	borderTop.style.top = pos.top;
	borderTop.style.width = targetElement.offsetWidth;
	
	var borderBottom = document.getElementById( borderId + "_bottom" );
	borderBottom.style.left = pos.left;
	borderBottom.style.top = pos.top + targetElement.offsetHeight - 1;
	borderBottom.style.width = targetElement.offsetWidth;
}

function InfoJet_ShowInvalidateBorder( targetElement , borderId ){
	var borderLeft = document.getElementById( borderId + "_left" );
	if( borderLeft == null ){
		var border = InfoJet_BuildInvalidateBorder( targetElement );
		var fieldStyle = document.getElementById( "xdoc_fieldstyle" );
		//fieldStyle.insertAdjacentHTML( "BeforeEnd", border );
		//CID 0017 //hgzhang //2008.06.16 //Begin
		InfoJet_InsertAdjacentHTMLBeforeEnd( fieldStyle, border );
		//CID 0017 //hgzhang //2008.06.16 //End
		
		borderLeft = document.getElementById( borderId + "_left" );
	} 
	
	var pos = InfoJet_GetPos( targetElement );
	
	var isSelect = InfoJet_IsSelect( targetElement );
	var selectOffset = 0;
	if( isSelect ){
		pos.left = pos.left - 2;
		pos.top = pos.top - 2;
		selectOffset = 4;
	}

	var borderLeftWidth = InfoJet_GetStylePixelSize( targetElement , "borderLeftWidth" , "border-left-width" );
	var borderTopWidth = InfoJet_GetStylePixelSize( targetElement , "borderTopWidth" , "border-top-width" );
	var borderRightWidth = InfoJet_GetStylePixelSize( targetElement , "borderRightWidth" , "border-right-width" );
	var borderBottomWidth = InfoJet_GetStylePixelSize( targetElement , "borderBottomWidth" , "border-bottom-width" );
	
	//有时候offsetHeight和offsetWidth是0.
	var height = 0;
	
	borderLeft.style.left = pos.left + borderLeftWidth - 2;
	borderLeft.style.top = pos.top + borderTopWidth - 2;
	height = targetElement.offsetHeight - borderTopWidth - borderBottomWidth + 2 + selectOffset;
	if( height >= 0 ){
		borderLeft.style.height = height;
	}
	
	var borderRight = document.getElementById( borderId + "_right" );
	borderRight.style.left = pos.left + targetElement.offsetWidth - borderRightWidth + selectOffset;
	borderRight.style.top = pos.top + borderTopWidth - 2;
	height = targetElement.offsetHeight - borderTopWidth - borderBottomWidth + 2 + selectOffset;
	if( height >= 0 ){
		borderRight.style.height = height;
	}
	
	var width = 0;
	
	var borderTop = document.getElementById( borderId + "_top" );
	borderTop.style.left = pos.left + borderLeftWidth - 2;
	borderTop.style.top = pos.top + borderTopWidth - 2;
	width = targetElement.offsetWidth - borderLeftWidth - borderRightWidth + 2 + selectOffset;
	if( width >= 0 ){
		borderTop.style.width = width;
	}
	
	var borderBottom = document.getElementById( borderId + "_bottom" );
	borderBottom.style.left = pos.left + borderLeftWidth - 2;
	borderBottom.style.top = pos.top + targetElement.offsetHeight - borderBottomWidth + selectOffset;
	width = targetElement.offsetWidth - borderLeftWidth - borderRightWidth + 2 + selectOffset;
	if( width >= 0 ){
		borderBottom.style.width = width;
	}
}

function InfoJet_ShowNotBlankMark( control ){
	var notBlankMark = document.getElementById( control.id + "_notBlank" );
	if( notBlankMark == null ){
		var notBlankMarkHtml = InfoJet_BuildNotBlankMark( control );
		var fieldStyle = document.getElementById( "xdoc_fieldstyle" );
		//fieldStyle.insertAdjacentHTML( "BeforeEnd", notBlankMarkHtml );
		//CID 0017 //hgzhang //2008.06.16 //Begin
		InfoJet_InsertAdjacentHTMLBeforeEnd( fieldStyle, notBlankMarkHtml );
		//CID 0017 //hgzhang //2008.06.16 //End
		
		notBlankMark = document.getElementById( control.id + "_notBlank" );
	}
	
	var isGhosted = false;
	var ghosted = control.getAttribute( InfoJet_XdPrefix + "ghosted" );
	if( ghosted != null && ghosted == "true" ){
		isGhosted = true;
	}
	
	if( control.value.length <= 0 || isGhosted ){
		var pos = InfoJet_GetPos( control );
		if( InfoJet_EnableUnderline ){
			notBlankMark.style.left = pos.left;
			notBlankMark.style.top = pos.top + control.offsetHeight;
			notBlankMark.style.width = control.offsetWidth;
		}else{
			if( control.tagName.toLowerCase() == "select" ){
				if( window.XMLHttpRequest ){ //IE7
					notBlankMark.style.left = pos.left + control.offsetWidth - 29;
					notBlankMark.style.top = pos.top + 4;
				}else{
					notBlankMark.style.left = pos.left + control.offsetWidth + 2;
					notBlankMark.style.top = pos.top + 4;
				}
			}else{
				notBlankMark.style.left = pos.left + control.offsetWidth - 12;
				notBlankMark.style.top = pos.top + (control.offsetHeight - 8)/2;
			}
		}
		notBlankMark.style.display = "block";
	}else{
		notBlankMark.style.display = "none";
	}
}

function InfoJet_ShowSectionBorder( targetElement , borderId ){
	var pos = InfoJet_GetPos( targetElement );
	
	var borderLeftWidth = InfoJet_GetStylePixelSize( targetElement , "borderLeftWidth" , "border-left-width" );
	var borderTopWidth = InfoJet_GetStylePixelSize( targetElement , "borderTopWidth" , "border-top-width" );
	var borderRightWidth = InfoJet_GetStylePixelSize( targetElement , "borderRightWidth" , "border-right-width" );
	var borderBottomWidth = InfoJet_GetStylePixelSize( targetElement , "borderBottomWidth" , "border-bottom-width" );
	
	var borderLeft = document.getElementById( borderId + "_left" );
	borderLeft.style.left = pos.left + borderLeftWidth - 1;
	borderLeft.style.top = pos.top + borderTopWidth - 1;
	borderLeft.style.height = targetElement.offsetHeight - borderTopWidth - borderBottomWidth;
	
	var borderRight = document.getElementById( borderId + "_right" );
	borderRight.style.left = pos.left + targetElement.offsetWidth - borderRightWidth;
	borderRight.style.top = pos.top + borderTopWidth;
	borderRight.style.height = targetElement.offsetHeight - borderTopWidth - borderBottomWidth;
	
	var borderTop = document.getElementById( borderId + "_top" );
	borderTop.style.left = pos.left + borderLeftWidth - 1;
	borderTop.style.top = pos.top + borderTopWidth - 1;
	borderTop.style.width = targetElement.offsetWidth - borderLeftWidth - borderRightWidth;
	
	var borderBottom = document.getElementById( borderId + "_bottom" );
	borderBottom.style.left = pos.left + borderLeftWidth;
	borderBottom.style.top = pos.top + targetElement.offsetHeight - borderBottomWidth;
	borderBottom.style.width = targetElement.offsetWidth - borderLeftWidth - borderRightWidth;
}

function InfoJet_ShowFocusMenuArrow( itemElement ){
	if( !InfoJet_ShowMenuArrow ){
		return;
	}
	var focusMenuArrowImg = document.getElementById( "xdoc_menu_focus_arrow_img" );
	var xctName = itemElement.getAttribute( InfoJet_XdPrefix + "xctname" );
	if( xctName == "Section" ){
		focusMenuArrowImg.src = InfoJet_WebContext + "images/infojet_menu_xoptional_focus_arrow.gif";
	}else if( xctName == "choiceterm" || xctName == "choicetermrepeating" ){
		focusMenuArrowImg.src = InfoJet_WebContext + "images/infojet_menu_xreplace_focus_arrow.gif";
	}else{
		focusMenuArrowImg.src = InfoJet_WebContext + "images/infojet_menu_xcollection_focus_arrow.gif";
	}
	var pos = InfoJet_GetPos( itemElement );
	var focusMenuArrow = document.getElementById( "xdoc_menu_focus_arrow" );
	focusMenuArrow.style.left = pos.left - 18 + 2;
	focusMenuArrow.style.top = pos.top + 2;
	focusMenuArrow.style.display = "block";
}

//CID 0010 //hgzhang //2008.06.05 //To Remove
function InfoJet_ShowOverMenuArrow( itemElement ){
	if( !InfoJet_ShowMenuArrow ){
		return;
	}
	var overMenuArrowImg = document.getElementById( "xdoc_menu_over_arrow_img" );
	var xctName = itemElement.getAttribute( InfoJet_XdPrefix + "xctname" );
	if( xctName == "Section" ){
		overMenuArrowImg.src = InfoJet_WebContext + "images/infojet_menu_xoptional_over_arrow.gif";
	}else if( xctName == "choiceterm" || xctName == "choicetermrepeating" ){
		overMenuArrowImg.src = InfoJet_WebContext + "images/infojet_menu_xreplace_over_arrow.gif";
	}else{
		overMenuArrowImg.src = InfoJet_WebContext + "images/infojet_menu_xcollection_over_arrow.gif";
	}
	var pos = InfoJet_GetPos( itemElement );
	var overMenuArrow = document.getElementById( "xdoc_menu_over_arrow" );
	overMenuArrow.style.left = pos.left - 18 + 2;
	overMenuArrow.style.top = pos.top + 2;
	overMenuArrow.style.display = "block";
}

//CID 0010 //hgzhang //2008.06.05 //To Remove
function InfoJet_HideOverMenuArrow(){
	var overMenuArrow = document.getElementById( "xdoc_menu_over_arrow" );
	if( overMenuArrow != null ){
		overMenuArrow.style.display = "none";	
	}
}

function InfoJet_HideBorder( borderId ){
	InfoJet_HideDashedBorder( borderId );
	InfoJet_HideNotBlankMark( borderId );
}

function InfoJet_HideDashedBorder( borderId ){
	var borderLeft = document.getElementById( borderId + "_left" );
	if( borderLeft == null ){
		return;
	}
	borderLeft.style.height = 0;
	var borderRight = document.getElementById( borderId + "_right" );
	borderRight.style.height = 0;
	var borderTop = document.getElementById( borderId + "_top" );
	borderTop.style.width = 0;
	var borderBottom = document.getElementById( borderId + "_bottom" );
	borderBottom.style.width = 0;
}

function InfoJet_HideNotBlankMark( borderId ){
	var borderNotBlank = document.getElementById( borderId + "_notBlank" );
	if( borderNotBlank != null ){
		borderNotBlank.style.display = "none";
	}
}

function InfoJet_HideFocusMenuArrow(){
	var focusMenuArrow = document.getElementById( "xdoc_menu_focus_arrow" );
	if( focusMenuArrow ){
		focusMenuArrow.style.display = "none";
	}
}

function InfoJet_HideAllErrors(){
	if( InfoJet_NoValidation ){
		return;
	}
	var xdocError = document.getElementById( "xdoc_data_error" );
	if( xdocError == null ){
		return;
	}
	var errors = InfoJet_CollectChildren( xdocError );
	for( var index = 0; index < errors.length; index ++ ){
		var error = errors[ index ];
		var jetId = error.getAttribute( "JetId" );
		InfoJet_HideError( jetId );
	}
}

function InfoJet_HideError( id ){
	var jetId = InfoJet_GetPureId( id );
	var invalidateId = jetId;
	for( var n = 0 ; true ; n ++ ){
		if( n != 0 ){
			invalidateId = jetId + "," + n;
		}
		var field = document.getElementById( invalidateId );
		if( field == null ){
			break;
		}else{
			InfoJet_ShowNecessaryInvalidateBorder( field , false );
			InfoJet_ResetTitle( field );
		}
	}
}

function InfoJet_ShowSchemaError( id ){
	var jetId = InfoJet_GetPureId( id );
	for( var n = 0 ; true ; n ++ ){
		var invalidateId = jetId;
		if( n != 0 ){
			invalidateId = jetId + "," + n;
		}
		var field = document.getElementById( invalidateId );
		if( field == null ){
			break;
		}else{
			InfoJet_ShowNecessaryInvalidateBorder( field , true );
		}
	}
}

function InfoJet_ShowAllErrors(){
	if( InfoJet_NoValidation ){
		return;
	}
	var xdocError = document.getElementById( "xdoc_data_error" );
	if( xdocError == null ){
		return;
	}
	var errors = InfoJet_CollectChildren( xdocError );
	for( var index = 0; index < errors.length; index ++ ){
		var error = errors[ index ];
		var id = error.getAttribute( "JetId" );
		var type = error.getAttribute( "type" );
		var jetId = InfoJet_GetPureId( id );
		if( type == "schema" ){
			for( var n = 0 ; true ; n ++ ){
				var invalidateId = jetId;
				if( n != 0 ){
					invalidateId = jetId + "," + n;
				}
				var field = document.getElementById( invalidateId );
				if( field == null ){
					break;
				}else{
					InfoJet_ShowNecessaryInvalidateBorder( field , true );
				}
			}
		}else if( type == "condition" ){
			for( var n = 0 ; true ; n ++ ){
				var invalidateId = jetId;
				if( n != 0 ){
					invalidateId = jetId + "," + n;
				}
				var field = document.getElementById( invalidateId );
				if( field == null ){
					break;
				}else{
					InfoJet_ShowNecessaryInvalidateBorder( field , true );
					InfoJet_ShowTitle( field, error.innerHTML );
				}
			}
		}else if( type == "program" ){
			for( var n = 0 ; true ; n ++ ){
				var invalidateId = jetId;
				if( n != 0 ){
					invalidateId = jetId + "," + n;
				}
				var field = document.getElementById( invalidateId );
				if( field == null ){
					break;
				}else{
					InfoJet_ShowNecessaryInvalidateBorder( field , true );
					InfoJet_ShowTitle( field, error.innerHTML );
				}
			}
		}
	}
}

function InfoJet_AddSchemaError( id ){
	var xdocError = document.getElementById( "xdoc_data_error" );
	if( xdocError == null ){
		return;
	}
	var errors = InfoJet_CollectChildren( xdocError );
	var found = false;
	for( var index = 0; index < errors.length; index ++ ){
		var error = errors[ index ];
		var jetId = error.getAttribute( "JetId" );
		var type = error.getAttribute( "type" );
		if( id == jetId && type == "schema" ){
			found = true;
			break;
		}
	}
	if( !found ){
		var div = "<div JetId='" + id + "' type='schema' style='display:none'></div>";
		//xdocError.insertAdjacentHTML( "BeforeEnd", div );
		//CID 0017 //hgzhang //2008.06.16 //Begin
		InfoJet_InsertAdjacentHTMLBeforeEnd( xdocError, div );
		//CID 0017 //hgzhang //2008.06.16 //End
	}
}

function InfoJet_RemoveError( id, errorType ){
	var removeId = InfoJet_GetPureId( id );
	var xdocError = document.getElementById( "xdoc_data_error" );
	if( xdocError == null ){
		return;
	}
	var errors = InfoJet_CollectChildren( xdocError );
	var found = false;
	for( var index = 0; index < errors.length; index ++ ){
		var error = errors[ index ];
		var jetId = error.getAttribute( "JetId" );
		var type = error.getAttribute( "type" );
		if( InfoJet_PureIdEquals( removeId, jetId ) && type == errorType ){
			//CID 0020 //hgzhang //2008.06.19 //Begin
			InfoJet_RemoveHtmlElement( error );
			//CID 0020 //hgzhang //2008.06.19 //End
		}
	}
}

function InfoJet_RemoveErrors( errorType ){
	var xdocError = document.getElementById( "xdoc_data_error" );
	if( xdocError == null ){
		return;
	}
	var errors = InfoJet_CollectChildren( xdocError );
	for( var index = 0; index < errors.length; index ++ ){
		var error = errors[ index ];
		var type = error.getAttribute( "type" );
		if( type == errorType ){
			//CID 0020 //hgzhang //2008.06.19 //Begin
			InfoJet_RemoveHtmlElement( error );
			//CID 0020 //hgzhang //2008.06.19 //End
		}
	}
}

function InfoJet_AddError( id, message, type ){
	var xdocError = document.getElementById( "xdoc_data_error" );
	if( xdocError == null ){
		return;
	}
	var div = "<div JetId='" + id + "' type='" + type + "' style='display:none'>" + message + "</div>";
	//xdocError.insertAdjacentHTML( "BeforeEnd", div );
	//CID 0017 //hgzhang //2008.06.16 //Begin
	InfoJet_InsertAdjacentHTMLBeforeEnd( xdocError, div );
	//CID 0017 //hgzhang //2008.06.16 //End
}

function InfoJet_ShowTitle( control , title ){
	var bakTitle = control.getAttribute( "title_bak" );
	if( bakTitle !=null ){
		if( bakTitle.length > 0 ){
			control.title = title + "\n" + bakTitle;
		}else{
			control.title = title;
		}
	}else{
		control.setAttribute( "title_bak" , control.title );
		if( control.title.length > 0 ){
			control.title = title + "\n" + control.title;
		}else{
			control.title = title;
		}
	}
}

function InfoJet_ResetTitle( control ){
	var bakTitle = control.getAttribute( "title_bak" );
	if( bakTitle !=null ){
		control.title = bakTitle;
		control.removeAttribute( "title_bak" );
	}
}

function InfoJet_ShowNecessaryInvalidateBorder( control , isShow ){
	if( InfoJet_NoValidation ){
		return;
	}
	var tagName = control.tagName.toLowerCase();
	if( tagName == "input" || tagName == "textarea" || tagName == "select" ){
		if( isShow ){
			var ghosted = control.getAttribute( InfoJet_XdPrefix + "ghosted" );
			if( ghosted != null && ghosted == "true" ){
				InfoJet_HideDashedBorder( control.id );
				InfoJet_ShowNotBlankMark( control );
			}else{
				if( control.value.length > 0 ){
					InfoJet_HideNotBlankMark( control.id );
					InfoJet_ShowInvalidateBorder( control , control.id );
				}else{
					InfoJet_HideDashedBorder( control.id );
					InfoJet_ShowNotBlankMark( control );
				}
			}
		}else{
			InfoJet_HideBorder( control.id );
		}
	}
}

function InfoJet_RefreshContext( source ){
	var idArray = "";
	var id = InfoJet_GetElementId( source );
	var element = source;
	while( id != "xdoc_view" ){
		if( id.indexOf( "_0_" ) == 0 ){
			idArray = idArray + id + ";";
		}
		element = InfoJet_GetParent( element );
		id = InfoJet_GetElementId( element );
	}
	if( idArray.length > 0 ){
		idArray = idArray.substr( 0 , idArray.length - 1 );
	}
	document.getElementById( "xdoc_param_context_id_array" ).value = idArray;
}

function InfoJet_GetInnerMostContextId( source ){
	var element = InfoJet_GetParent( source );
	var id = element.id;
	while( id != "xdoc_view" ){
		if( id.indexOf( "_0_" ) == 0 ){
			return id;
		}
		element = InfoJet_GetParent( element );
		id = InfoJet_GetElementId( element );
	}
	return document.getElementById( "xdoc_data_root_element_id" ).innerHTML;
}

function InfoJet_IsFuncDefined( funcName ){
	var stat = "typeof( " + funcName + " ) != 'undefined';";
	return eval( stat );
}

function InfoJet_OnMasterDetial( event , source ){
	//To improve the performance, check xdoc_param_master_detial first.
	var masterDetials = document.getElementById( "xdoc_param_master_detial" ).value;
	if( masterDetials.length <= 0 ){
		return;
	}
	var masterNameAttr = InfoJet_XdPrefix + "masterName";
	var masterDetial = InfoJet_GetMasterDetial( source );
	if( masterDetial != null ){
		if( masterDetial.tbody != null && masterDetial.tr != null ){
			//Start to handler the master detials from here.
			var masterName = masterDetial.tbody.getAttribute( masterNameAttr );
			var curDetialRow = InfoJet_GetCurrentDetialRow( masterDetial );
			InfoJet_DoMasterDetail( source, masterName, curDetialRow );
		}
	}
}

function InfoJet_DoMasterDetail( source, masterName, curDetialRow ){
	if( InfoJet_ValueChanging > 0 && InfoJet_ValueChanging <= InfoJet_WaitTimes ){
		InfoJet_ValueChanging ++;
		setTimeout( function(){ InfoJet_DoMasterDetail( source, masterName, curDetialRow ); }, InfoJet_Interval );
	}else{
		if( source.parentElement == null ){
			return;
		}
		InfoJet_MoveProgress2ControlPosition( source );
		if( InfoJet_UpdateMasterDetial( masterName , curDetialRow ) ){
			document.getElementById( "xdoc_param_command" ).value = "Update_Refresh";
			InfoJet_Submit();
		}
	}
}

function InfoJet_RefreshAfaterUpdate( field ){
	if( InfoJet_NoPostback ){
		return;
	}
	if( InfoJet_ValueChanging > 0 && InfoJet_ValueChanging <= InfoJet_WaitTimes ){
		InfoJet_ValueChanging ++;
		setTimeout( function(){ InfoJet_RefreshAfaterUpdate( field ); }, InfoJet_Interval );
	}else{
		InfoJet_MoveProgress2ControlPosition( field );
		document.getElementById( "xdoc_param_update_id" ).value = field.id;
		document.getElementById( "xdoc_param_update_format" ).value = field.getAttribute( InfoJet_XdPrefix + "datafmt" );
		document.getElementById( "xdoc_param_command" ).value = "Update_Refresh";
		InfoJet_Submit();
	}
}

function InfoJet_CheckClickFrequently( source ){
	if( InfoJet_Postbacking > 0 ){
		alert( "Please try again while the progress is finished." );
		//Don't return InfoJet_Postbacking directly.
		return true;
	}else{
		if( source == null ){
			//No source found.
			alert( "Please try again while the progress is finished." );
			return true;
		}
		var parent = InfoJet_GetParent( source );
		if( parent == null ){
			//The view is updated by another postback.
			alert( "Please try again while the progress is finished." );
			return true;
		}
		return false;
	}
}

function InfoJet_OnPlaceholderClick( event , placeholder ){
	//CID 0108 //hgzhang //2008.09.01 //Begin
	var xmlToEdit = placeholder.getAttribute( InfoJet_XdPrefix + "xmlToEdit" );
	var xmlToEditDisabled = "-" + xmlToEdit + "-editing: disabled"
	var parent = InfoJet_GetParent(placeholder);
	while( parent != null ){
		var style = parent.style.cssText;
		if( style != null && style.indexOf( xmlToEditDisabled ) > 0 )
		{
			return;
		}
		parent = InfoJet_GetParent(parent);
		if( parent != null && parent.id == "xdoc_view" ){
			break;
		}
	}
	//CID 0108 //hgzhang //2008.09.01 //End

	if( InfoJet_ValueChanging > 0 && InfoJet_ValueChanging <= InfoJet_WaitTimes ){
		InfoJet_ValueChanging ++;
		setTimeout( function(){ InfoJet_OnPlaceholderClick( event, placeholder ); }, InfoJet_Interval );
	}else{
		if( InfoJet_CheckClickFrequently( placeholder ) ){
			return;
		}
		InfoJet_MoveProgress2ControlPosition( placeholder );
		InfoJet_RefreshContext( placeholder );
		var xmlToEditName = placeholder.getAttribute( InfoJet_XdPrefix + "xmlToEdit" );
		var xmlToEditAction = placeholder.getAttribute( InfoJet_XdPrefix + "action" );
		if( (!InfoJet_IsViewValid()) && InfoJet_IsIdInArray( xmlToEditName , "xdoc_data_valid_view_xmltoedit_list" ) ){
			if( xmlToEditAction.indexOf( "::remove" ) < 0 ){
				alert( InfoJet_CorrectFirstMessage );
				return;
			}
		}
		document.getElementById( "xdoc_param_xml_to_edit_name" ).value = xmlToEditName;
		document.getElementById( "xdoc_param_xml_to_edit_action" ).value = xmlToEditAction;
		document.getElementById( "xdoc_param_command" ).value = "Update_XmlToEdit";
		InfoJet_Submit();
	}
}

function InfoJet_OnPlaceholderKeydown( event, placeholder ){
	if(event.keyCode==13){
		InfoJet_OnPlaceholderClick( event, placeholder );
	}
}

function InfoJet_DoXmlToEditAction( itemId , xmlToEditName , xmlToEditAction ){
	if( InfoJet_ValueChanging > 0 && InfoJet_ValueChanging <= InfoJet_WaitTimes ){
		InfoJet_ValueChanging ++;
		setTimeout( function(){ InfoJet_DoXmlToEditAction( itemId , xmlToEditName , xmlToEditAction ); }, InfoJet_Interval );
	}else{
		var source = document.getElementById( itemId );
		if( InfoJet_CheckClickFrequently( source ) ){
			return;
		}
		InfoJet_MoveProgress2ControlPosition( source );
		if( (!InfoJet_IsViewValid()) && InfoJet_IsIdInArray( xmlToEditName , "xdoc_data_valid_view_xmltoedit_list" ) ){
			if( xmlToEditAction.indexOf( "::remove" ) < 0 ){
				alert( InfoJet_CorrectFirstMessage );
				return;
			}
		}
		var contextIds = new Array();
		if( itemId == null ){
			contextIds[ contextIds.length ] = document.getElementById( "xdoc_data_root_element_id" ).innerHTML;
		}else{
			InfoJet_GetMenuContextIds( contextIds , source );
		}
		var contextIdArray = "";
		for( var i = 0 ; i < contextIds.length ; i ++ ){
			contextIdArray += contextIds[ i ];
			if( i < contextIds.length - 1 ){
				contextIdArray += ";";
			}
		}
		document.getElementById( "xdoc_param_context_id_array" ).value = contextIdArray;
		document.getElementById( "xdoc_param_xml_to_edit_name" ).value = xmlToEditName;
		document.getElementById( "xdoc_param_xml_to_edit_action" ).value = xmlToEditAction;
		document.getElementById( "xdoc_param_command" ).value = "Update_XmlToEdit";
		InfoJet_Submit();
	}
}

function InfoJet_DoSwitchView( viewId ){
	if( InfoJet_ValueChanging > 0 && InfoJet_ValueChanging <= InfoJet_WaitTimes ){
		InfoJet_ValueChanging ++;
		setTimeout( function(){ InfoJet_DoSwitchView( viewId ); }, InfoJet_Interval );
	}else{
		InfoJet_MoveProgress2CentralPosition();
		document.getElementById( "xdoc_param_view_id" ).value = viewId;
		document.getElementById( "xdoc_param_command" ).value = "Update_View";
		InfoJet_Submit();
	}
}

function InfoJet_DoNew( source ){
	if( InfoJet_ValueChanging > 0 && InfoJet_ValueChanging <= InfoJet_WaitTimes ){
		InfoJet_ValueChanging ++;
		setTimeout( function(){ InfoJet_DoNew( source ); }, InfoJet_Interval );
	}else{
		InfoJet_MoveProgress2ControlPosition( source );
		if( confirm( InfoJet_DeleteAllMessage ) ){
			document.getElementById( "xdoc_param_command" ).value = "Update_New";
			InfoJet_Submit();
		}
	}
}

function InfoJet_DoQuery( source ){
	if( InfoJet_ValueChanging > 0 && InfoJet_ValueChanging <= InfoJet_WaitTimes ){
		InfoJet_ValueChanging ++;
		setTimeout( function(){ InfoJet_DoQuery( source ); }, InfoJet_Interval );
	}else{
		InfoJet_MoveProgress2ControlPosition( source );
		document.getElementById( "xdoc_param_command" ).value = "Update_Query";
		InfoJet_Submit();
	}
}

function InfoJet_DoQueryDirect(){
	if( InfoJet_ValueChanging > 0 && InfoJet_ValueChanging <= InfoJet_WaitTimes ){
		InfoJet_ValueChanging ++;
		setTimeout( function(){ InfoJet_DoQueryDirect(); }, InfoJet_Interval );
	}else{
		document.getElementById( "xdoc_param_command" ).value = "Update_Query";
		InfoJet_Submit();
	}
}

function InfoJet_DoRefresh( source ){
	if( InfoJet_ValueChanging > 0 && InfoJet_ValueChanging <= InfoJet_WaitTimes ){
		InfoJet_ValueChanging ++;
		setTimeout( function(){ InfoJet_DoRefresh( source ); }, InfoJet_Interval );
	}else{
		InfoJet_MoveProgress2ControlPosition( source );
		document.getElementById( "xdoc_param_command" ).value = "Update_Refresh";
		var auxDom = source.getAttribute( InfoJet_XdPrefix + "auxDom" );
		if( auxDom == null ){ auxDom = ""; }
		document.getElementById( "xdoc_param_auxdom" ).value = auxDom;
		InfoJet_Submit();
	}
}

function InfoJet_DoSubmit( source ){
	if( InfoJet_ValueChanging > 0 && InfoJet_ValueChanging <= InfoJet_WaitTimes ){
		InfoJet_ValueChanging ++;
		setTimeout( function(){ InfoJet_DoSubmit( source ); }, InfoJet_Interval );
	}else{
		InfoJet_MoveProgress2ControlPosition( source );
		if( InfoJet_ValidSubmit && (!InfoJet_IsValid()) && (!InfoJet_NoValidation) ){
			alert( InfoJet_CorrectFirstMessage );
			return;
		}
		document.getElementById( "xdoc_param_command" ).value = "Update_Submit";
		InfoJet_Submit();
	}
}

function InfoJet_DoSubmitDirect(){
	if( InfoJet_ValueChanging > 0 && InfoJet_ValueChanging <= InfoJet_WaitTimes ){
		InfoJet_ValueChanging ++;
		setTimeout( function(){ InfoJet_DoSubmitDirect(); }, InfoJet_Interval );
	}else{
		document.getElementById( "xdoc_param_command" ).value = "Update_Submit";
		InfoJet_Submit();
	}
}

function InfoJet_OpenExportedMHT( source ){
	if( InfoJet_ValueChanging > 0 && InfoJet_ValueChanging <= InfoJet_WaitTimes ){
		InfoJet_ValueChanging ++;
		setTimeout( function(){ InfoJet_OpenExportedMHT( source ); }, InfoJet_Interval );
	}else{
		InfoJet_MoveProgress2ControlPosition( source );
		document.getElementById( "xdoc_param_command" ).value = "Update_Button";
		document.getElementById( "xdoc_param_button" ).value = "Inner_Export_Mht_Button";
		document.getElementById( "xdoc_param_button_source" ).value = "";
		InfoJet_Submit();
	}
}

function InfoJet_DoButton( source ){
	if( InfoJet_ValueChanging > 0 && InfoJet_ValueChanging <= InfoJet_WaitTimes ){
		InfoJet_ValueChanging ++;
		setTimeout( function(){ InfoJet_DoButton( source ); }, InfoJet_Interval );
	}else{
		if( InfoJet_CheckClickFrequently( source ) ){
			return;
		}
		InfoJet_MoveProgress2ControlPosition( source );
		var ctrlId = source.getAttribute( InfoJet_XdPrefix + "CtrlId" );
		if( ctrlId == null ){ 
			return;
		}
		if( (!InfoJet_IsViewValid()) && InfoJet_IsIdInArray( ctrlId , "xdoc_data_valid_view_button_list" ) ){
			alert( InfoJet_CorrectFirstMessage );
			return;
		}
		if( (!InfoJet_IsValid()) && InfoJet_IsFuncDefined( "OnValidFormButton_" + ctrlId ) ){
			eval( "OnValidFormButton_" + ctrlId + "();" );
			return;
		}
		if( InfoJet_IsFuncDefined( "OnClientScriptButton_" + ctrlId ) ){
			if( !eval( "OnClientScriptButton_" + ctrlId + "();" ) ){
				return;
			}
		}
		var isSubmitButton = source.getAttribute( "submit_button" );
		if( isSubmitButton != null && isSubmitButton == "true" ){
			if( InfoJet_ValidSubmit && (!InfoJet_IsValid()) && (!InfoJet_NoValidation) ){
				alert( InfoJet_CorrectFirstMessage );
				return;
			}
		}
		document.getElementById( "xdoc_param_command" ).value = "Update_Button";
		document.getElementById( "xdoc_param_button" ).value = ctrlId;
		document.getElementById( "xdoc_param_button_source" ).value = InfoJet_GetInnerMostContextId( source );
		InfoJet_Submit();
	}
}

function InfoJet_DoButtonDirect( ctrlId, buttonSource )
{
	if( InfoJet_ValueChanging > 0 && InfoJet_ValueChanging <= InfoJet_WaitTimes ){
		InfoJet_ValueChanging ++;
		setTimeout( function(){ InfoJet_DoButtonDirect( ctrlId, buttonSource ); }, InfoJet_Interval );
	}else{
		InfoJet_MoveProgress2CentralPosition();
		document.getElementById( "xdoc_param_command" ).value = "Update_Button";
		document.getElementById( "xdoc_param_button" ).value = ctrlId;
		document.getElementById( "xdoc_param_button_source" ).value = buttonSource;
		InfoJet_Submit();
	}
}

function InfoJet_RebuildByCommand( command ){
	if( InfoJet_ValueChanging > 0 && InfoJet_ValueChanging <= InfoJet_WaitTimes ){
		InfoJet_ValueChanging ++;
		setTimeout( function(){ InfoJet_RebuildByCommand( command ); }, InfoJet_Interval );
	}else{
		if( InfoJet_ShowProgress && InfoJet_Progress == null ){ //InfoJet_Init() not called.
			InfoJet_FuncAfterInit = "InfoJet_MoveProgress2CentralPosition(); InfoJet_StartProgress();";
		}
		InfoJet_MoveProgress2CentralPosition();
		document.getElementById( "xdoc_param_command" ).value = "Update_Rebuild";
		document.getElementById( "xdoc_param_rebuild_command" ).value = command;
		InfoJet_Submit();
	}
}

function InfoJet_CallLater( func, param ){
	if( InfoJet_ValueChanging > 0 && InfoJet_ValueChanging <= InfoJet_WaitTimes ){
		InfoJet_ValueChanging ++;
		setTimeout( function(){ InfoJet_CallLater( func, param ); }, InfoJet_Interval );
	}else{
		func( param );
	}
}

//CID 0087 //hgzhang //2008.08.05 //Begin
function InfoJet_OnPostbackStart(){
	if( InfoJet_IsFuncDefined( "InfoJetCustom_OnPostbackStart" ) ){
		eval( "InfoJetCustom_OnPostbackStart();" );
	}
}
//CID 0087 //hgzhang //2008.08.05 //End

//CID 0087 //hgzhang //2008.08.05 //Begin
function InfoJet_OnPostbackEnd(){
	if( InfoJet_IsFuncDefined( "InfoJetCustom_OnPostbackEnd" ) ){
		eval( "InfoJetCustom_OnPostbackEnd();" );
	}
}
//CID 0087 //hgzhang //2008.08.05 //End

function InfoJet_Submit(){   
	InfoJet_Postbacking = 1;
	InfoJet_StartProgress();
	
	//CID 0087 //hgzhang //2008.08.05 //Begin
	InfoJet_OnPostbackStart();
	//CID 0087 //hgzhang //2008.08.05 //End
	if( InfoJet_UseAjax != "none" ){	//CID 0134 //hgzhang //2008.10.05 //none
		document.getElementById( "xdoc_param_ajax" ).value = "true";
		InfoJet_AJAXRequest();
	}else{
		//test MultipleMessages.xsn
		var form = document.getElementById( "xdoc_form" );
		var serviceAction = document.getElementById( "xdoc_param_action" ).value;
		var frameDocument = InfoJet_GetFrameDocument( "xdoc_frame" );
		if( frameDocument.forms.length > 0 && frameDocument.forms[0].name != "xdoc_service" ){
			//InfoJet EditPart,submit in the webpart form.
			frameDocument.forms[0].innerHTML = form.innerHTML;
			frameDocument.forms[0].submit();
		}else{
			var content = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></meta></head>";
			content += "<body><form id='xdoc_service' name='xdoc_service' method='post' action='" + serviceAction + "'>";
			content += "</form></body></html>";
			frameDocument.write( content );
			frameDocument.forms[0].innerHTML = form.innerHTML;
			frameDocument.forms[0].submit();
		}
	}
}

function InfoJet_ValueChange( field ){
	if( InfoJet_NoPostback ){
		return;
	}
	InfoJet_ValueChanging = 1;
	InfoJet_Postbacking = 1;
	InfoJet_StartProgress();
	
	//CID 0077 //hgzhang //2008.08.01 //Begin
	InfoJet_OnPostbackStart();
	//CID 0077 //hgzhang //2008.08.01 //End
	
	document.getElementById( "xdoc_param_command" ).value = "Update_ValueChange";
	document.getElementById( "xdoc_param_update_id" ).value = field.id;
	document.getElementById( "xdoc_param_update_format" ).value = field.getAttribute( InfoJet_XdPrefix + "datafmt" );

	var form = document.getElementById( "xdoc_form" );
	var serviceAction = document.getElementById( "xdoc_param_action" ).value;
	var content = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></meta></head>";
	content += "<body><form id='xdoc_service' name='xdoc_service' method='post' action='" + serviceAction + "'>";
	content += form.innerHTML;
	content += "</form></body></html>"
	var frameDocument = InfoJet_GetFrameDocument( "xdoc_frame" );
	frameDocument.write( content );
	var serviceForm = frameDocument.getElementById( "xdoc_service" );
	serviceForm.submit();
}

function InfoJet_AJAXonField( field, logicTags ){
	if( InfoJet_NoPostback ){
		return;
	}
	InfoJet_ValueChanging = 1;
	InfoJet_Postbacking = 1;
	InfoJet_StartProgress();
	
	//CID 0077 //hgzhang //2008.08.01 //Begin
	InfoJet_OnPostbackStart();
	//CID 0077 //hgzhang //2008.08.01 //End
	
	document.getElementById( "xdoc_param_update_id" ).value = field.id;
	document.getElementById( "xdoc_param_update_format" ).value = field.getAttribute( InfoJet_XdPrefix + "datafmt" );
	document.getElementById( "xdoc_param_ajax" ).value = "true";
	if( logicTags != null ){
		document.getElementById( "xdoc_param_command" ).value = "Update_Refresh";
	}else{
		document.getElementById( "xdoc_param_command" ).value = "Update_ValueChange";
	}
	
	InfoJet_AJAXRequest();
}

function InfoJet_AJAXRequest(){
	var form = document.getElementById( "xdoc_form" );
	var fields = InfoJet_GetAllChildren( form );
	var post = "";
	if (window.InfoJetAJAXRequestBefore)
	{
	    window.InfoJetAJAXRequestBefore();
	}
	for( var index = 0; index < fields.length - 1; index ++ ){
		var field = fields[ index ];
		if( field.name ){
			post = post + field.name + "=" + encodeURIComponent( field.value ) + "&";
		}
	}
	var instanceIdDom=document.getElementById("_formInstanceId");
	if (instanceIdDom && instanceIdDom.value) {
	    post += "_formInstanceId=" + instanceIdDom.value;
	}
	var serviceAction = document.getElementById( "xdoc_param_action" ).value;
	InfoJet_XHR = InfoJet_AJAXCreateRequest();
	InfoJet_XHR.onreadystatechange = InfoJet_AJAXResponse;
	//CID 0134 //hgzhang //2008.10.05 //Begin
	var isSync = true;
	if( InfoJet_UseAjax == "async" ){
		isSync = false;
	}
	InfoJet_XHR.open("POST", serviceAction, isSync);	//CID 0133 //hgzhang //2008.10.05 //open
	//CID 0134 //hgzhang //2008.10.05 //End
	InfoJet_XHR.setRequestHeader("Content-Length",post.length);
	InfoJet_XHR.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
	InfoJet_XHR.send(post);							//CID 0133 //hgzhang //2008.10.05 //send
}

function InfoJet_AJAXResponse(){
	if(InfoJet_XHR.readyState == 4){
		if(InfoJet_XHR.status == 200){
			var responseText = InfoJet_XHR.responseText;
			if( InfoJet_AjaxBracket != null && InfoJet_AjaxBracket.length > 0 ){
				var ajaxBracket = "--" + InfoJet_AjaxBracket + "--";
				var ajaxBracketIndex = responseText.indexOf( ajaxBracket );
				var ajaxBracketStart = ajaxBracketIndex + ajaxBracket.length;
				var ajaxBracketEnd = responseText.indexOf( ajaxBracket, ajaxBracketStart );
				responseText = responseText.substr( ajaxBracketStart, ajaxBracketEnd - ajaxBracketStart );
			}
			try{
				var loginUrlKey = "InfoJetSoft.Service.LoginUrl(";
				var loginUrlStart = responseText.indexOf( loginUrlKey );
				if( loginUrlStart >= 0 ){
					var loginUrlEnd = responseText.indexOf( ")", loginUrlStart );
					loginUrlStart = loginUrlStart + loginUrlKey.length;
					var loginUrl = responseText.substr( loginUrlStart, loginUrlEnd - loginUrlStart );
					if( typeof(InfoJetCustom_BeforeGotoLoginPage) != "undefined" ){
						eval( "InfoJetCustom_BeforeGotoLoginPage();" );
					}
					window.location = loginUrl;
					return;
				}
				//CID 0135 //hgzhang //2008.10.05 //Begin
				if( responseText.indexOf( "----$InfoJet_Separator$----" ) > 0 ){
					var fragments = responseText.split( "----$InfoJet_Separator$----" );
					var viewHtml = fragments[0];
					var formHtml = fragments[1];
					var dataHtml = fragments[2];
					responseText = fragments[3];
					InfoJet_ReloadFormVars( viewHtml, formHtml, dataHtml );
					eval( responseText );
				//CID 0135 //hgzhang //2008.10.05 //End
				}else{
					eval( responseText );
				}
			}catch( e ){
				var startErrorMessageIndex = responseText.indexOf( "--InfoJet_Custom_Error_Message--" );
				var endErrorMessageIndex = responseText.lastIndexOf( "--InfoJet_Custom_Error_Message--" );
				if( startErrorMessageIndex >= 0 && endErrorMessageIndex > startErrorMessageIndex ){
					startErrorMessageIndex = startErrorMessageIndex + "--InfoJet_Custom_Error_Message--".length;
					var errorMessage = responseText.substr( startErrorMessageIndex, endErrorMessageIndex - startErrorMessageIndex );
					errorMessage = errorMessage.replace(/(^\s*)|(\s*$)/g, "");
					alert( errorMessage );
				}else{
					if( responseText.indexOf( "var " ) != 0 ){
						alert( responseText );
					}else{
						alert( e.message );
					}
				}
				InfoJet_ValueChanging = 0;
				InfoJet_Postbacking = 0;
			}
		}else{
			InfoJet_StopProgress();
			if( InfoJet_IsFuncDefined( "InfoJetCustom_OnAjaxError" ) ){
				InfoJetCustom_OnAjaxError( InfoJet_XHR );
			}
		}
    }
}

function InfoJet_AJAXCreateRequest(){
	var xhr = null;
	if( document.all ){
		try {
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}catch (e){
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e2) {
				xhr = null;
			}
		}
	}else{
		//CID 0133 //hgzhang //2008.10.05 //Begin
		xhr = new XMLHttpRequest();
		//CID 0133 //hgzhang //2008.10.05 //End
	}
	if( xhr == null ){
		alert("Failed: Cannot create XMLHttpRequest.");
	}
	return xhr;
}

function InfoJet_UpdateAjaxBracket(){
	var ajaxBracket = document.getElementById( "xdoc_param_ajax_bracket" );
	if( ajaxBracket != null ){
		ajaxBracket.value = InfoJet_AjaxBracket;
	}
}

var InfoJet_ModalFocus = null;

function InfoJet_BuildProgress(){
	if( InfoJet_ShowProgress && InfoJet_Progress == null ){
		var progressHtml = "<div id='xdoc_progress' style='visibility:hidden;position:absolute;z-order:100'><img src='" + InfoJet_WebContext + "images/infojet_progress_circle.gif'></div>";
		//CID 0017 //hgzhang //2008.06.16 //Begin
		InfoJet_InsertAdjacentHTMLBeforeEnd( document.body, progressHtml );
		//CID 0017 //hgzhang //2008.06.16 //End
		InfoJet_Progress = document.getElementById( "xdoc_progress" );
		
		//CID 0077 //hgzhang //2008.08.03 //Begin
		if( InfoJet_ShowModalScreen ){
			var modalScreenHtml = "<div id='xdoc_modalscreen' style='width:0px;height:0px;position:absolute;z-order:99;background:#FFFFFF;filter:alpha(opacity=50);-moz-opacity:0.5;opacity:0.5;padding:0px;margin:0px;'>&nbsp;</div>";
			InfoJet_InsertAdjacentHTMLBeforeEnd( document.body, modalScreenHtml );
			InfoJet_ModalScreen = document.getElementById( "xdoc_modalscreen" );
			//FireFox cannot focus on the div.
			if( !InfoJet_IsIE() ){
				var modalFocusHtml = "<input id='xdoc_modalfocus' type='text' style='width:0px;height:0px;position:absolute;display:none;'></input>";
				InfoJet_InsertAdjacentHTMLBeforeEnd( document.body, modalFocusHtml );
				InfoJet_ModalFocus = document.getElementById( "xdoc_modalfocus" );
			}
		}
		//CID 0077 //hgzhang //2008.08.03 //End
	}
}

function InfoJet_MoveProgress2Position( left, top ){
	if( InfoJet_ShowProgress && InfoJet_Progress != null ){
		InfoJet_Progress.style.left = left;
		InfoJet_Progress.style.top = top;
	}
}

function InfoJet_MoveProgress2CentralPosition(){
	if( InfoJet_ShowProgress && InfoJet_Progress != null ){
		InfoJet_Progress.style.left = document.body.clientWidth / 2 - InfoJet_Progress.offsetWidth + document.body.scrollLeft;
		InfoJet_Progress.style.top = document.body.clientHeight / 2 - InfoJet_Progress.offsetHeight + document.body.scrollTop;
	}
}

function InfoJet_MoveProgress2ControlPosition( control ){
	if( InfoJet_ShowProgress && InfoJet_Progress != null ){
		if( control ){
			var xAlgin = control.offsetWidth / 2 + InfoJet_Progress.offsetWidth / 2;
			var yAlgin = control.offsetHeight / 2 + InfoJet_Progress.offsetHeight / 2;
			try{
				var pos = InfoJet_GetPos( control );
				InfoJet_Progress.style.left = pos.left + control.offsetWidth - xAlgin;
				InfoJet_Progress.style.top = pos.top + control.offsetHeight - yAlgin;
			}catch( e ){
				InfoJet_MoveProgress2CentralPosition();
			}
		}else{
			InfoJet_MoveProgress2CentralPosition();
		}
	}
}

function InfoJet_MoveProgress2MousePosition( event ){
	if( InfoJet_ShowProgress && InfoJet_Progress != null ){
		if( event ){
			InfoJet_Progress.style.left = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			InfoJet_Progress.style.top = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}else{
			InfoJet_MoveProgress2CentralPosition();
		}
	}
}

function InfoJet_StartProgress(){
	if( InfoJet_ShowProgress && InfoJet_Progress != null ){
		InfoJet_Progress.style.visibility = "visible";
	}
}

function InfoJet_StopProgress(){		
	if( InfoJet_ShowProgress && InfoJet_Progress != null ){
		InfoJet_Progress.style.visibility = "hidden";
		
		//CID 0077 //hgzhang //2008.08.03 //Begin
		if( InfoJet_ShowModalScreen && InfoJet_ModalScreen != null ){
			InfoJet_ModalScreen.style.width = "0px";
			InfoJet_ModalScreen.style.height = "0px";
		}
		//CID 0077 //hgzhang //2008.08.03 //End
	}
	
	//CID 0080 //hgzhang //2008.08.03 //Begin
	if( InfoJet_ActiveElementId != null && InfoJet_ActiveElementId.length > 0 ){
		var element = document.getElementById( InfoJet_ActiveElementId );
		if( element != null ){
			if( element != InfoJet_ActiveElement ){
				InfoJet_TextStart = 0;
				InfoJet_TextEnd = 0;
			}else if( InfoJet_ActiveElement.tagName.toLowerCase() == "textarea" ){
				//CID 0083 //hgzhang //2008.08.05 //Begin
				var defaultRows = InfoJet_ActiveElement.getAttribute( "default_rows" );
				if( defaultRows != null && defaultRows == "1" ){
					InfoJet_ActiveElement.select();
				//CID 0083 //hgzhang //2008.08.05 //End
				}else{
					InfoJet_RestoreTextPos( InfoJet_ActiveElement );
				}
			}
		}
	}
	InfoJet_ActiveElement = null;
	InfoJet_ActiveElementId = null;
	//CID 0080 //hgzhang //2008.08.03 //End
}

function InfoJet_SubmitToHost( source ){
	if( InfoJet_ValueChanging > 0 && InfoJet_ValueChanging <= InfoJet_WaitTimes ){
		InfoJet_ValueChanging ++;
		setTimeout( "InfoJet_SubmitToHost(document.getElementById('" + source.id + "'));", InfoJet_Interval );
	}else{
		InfoJet_ValueChanging = 0;
		if( InfoJet_ValidSubmit && (!InfoJet_IsValid()) && (!InfoJet_NoValidation) ){
			alert( InfoJet_CorrectFirstMessage );
			return;
		}
		
		if( InfoJet_IsFuncDefined( "InfoJetCustom_SubmitToHost" ) ){
			eval( "InfoJetCustom_SubmitToHost();" );
		}else{
			var form = null;
			var element = InfoJet_GetParent( source );
			while( element != null ){
				if( element.tagName.toLowerCase() == "form" ){
					form = element;
					break;
				}
				element = InfoJet_GetParent( element );
			}
			if( form != null ){
				form.submit();
			}
		}
	}
}

function InfoJet_Try2CloseWindow( isPromptToSaveChanges ){
	var formWindow = null;
	if( InfoJet_UseAjax != "none" ){	//CID 0134 //hgzhang //2008.10.05 //none
		formWindow = window;
	}else{
		formWindow = window.parent;
	}
	if( isPromptToSaveChanges ){
		if( formWindow.InfoJet_Changed ){
			if( formWindow.confirm( 'The document has been changed, do you want to close anyway?' ) ){
				InfoJet_CloseWindow( formWindow );
			}
		}else{
			InfoJet_CloseWindow( formWindow );
		}
	}else{
		InfoJet_CloseWindow( formWindow );
	}
}

function InfoJet_CloseWindow( formWindow ){
	if( InfoJet_IsFuncDefined( "InfoJetCustom_CloseWindow" ) ){
		InfoJetCustom_CloseWindow( formWindow );
	}else{
		formWindow.opener=null; formWindow.close();
	}
}

function InfoJet_IsIdInIds( id , ids ){
	for( var i = 0 ; i < ids.length ; i ++ ){
		if( ids[ i ] == id ){
			return true;
		}
	}
	return false;
}

function InfoJet_ResetExpressionBox( id , value ){
	var exprBox = document.getElementById( id );
	if( exprBox != null ){
		exprBox.innerHTML = value;
	}
}

function InfoJet_ResetConditionFormat( id , style , readonly ){
	var condiFormatElement = document.getElementById( id );
	if( condiFormatElement != null ){
		condiFormatElement.style.cssText = style;
		if( readonly == "1" ){
			condiFormatElement.readOnly = true;
		}else{
			condiFormatElement.readOnly = false;
		}
	}
}

function InfoJet_SetFormatedValue( id , value ){
	var input = document.getElementById( id );
	if( input != null ){
		input.value = value;
	}
}

function InfoJet_SetUnformatedValue( id , value ){
	var id = InfoJet_GetPureId( id );
	var field = document.getElementById( "xdoc" + id );
	if( field != null ){
		field.value = value;
	}
}

function InfoJet_SetAssignmentValue( id , value ){
	var field = document.getElementById( "xdoc" + id );
	if( field != null ){
		field.value = value;
	}
	field = document.getElementById( id );
	if( field != null ){
		var tagName = field.tagName.toLowerCase();
		if( tagName == "input" || tagName == "textarea" ){
			field.value = value;
			InfoJet_ResizeTextArea( field, true );
		}
	}
	for( var i = 1 ; true ; i ++ ){
		var dupId = id + "," + i;
		field = document.getElementById( dupId );
		if( field == null ){
			break;
		}else{
			var tagName = field.tagName.toLowerCase();
			if( tagName == "input" || tagName == "textarea" || tagName == "select" ){
				field.value = value;
			}
		}
	}
}

function InfoJet_SetXmlField( id, valueField ){
	InfoJet_SetXmlFieldDirect( id, valueField.value );
}

function InfoJet_SetXmlFieldDirect( id, value ){
	var htmlField = document.getElementById( id );
	var xmlField = document.getElementById( "xdoc" + id );
	if( xmlField != null ){
		value = InfoJet_FormatBr( value );
		xmlField.value = value;
	}
}

function InfoJet_SetHtmlField( id, valueField, styleField, readonly, disabled ){
	if( valueField != null ){
		InfoJet_SetHtmlFieldDirect( id, valueField.value, styleField.innerHTML, readonly, disabled );
	}else{
		InfoJet_SetHtmlFieldDirect( id, null, styleField.innerHTML, readonly, disabled );
	}
}

function InfoJet_SetHtmlFieldDirect( id, value, style, readonly, disabled ){
	var htmlField = document.getElementById( id );
	if( htmlField != null ){
		//CID 0130 //hgzhang //2008.10.02 //Comment
		//var xctname = htmlField.getAttribute( InfoJet_XdPrefix + "xctname" );
		//if( xctname != "DTPicker_DTText" ){
		htmlField.style.cssText = style;
		//}
		//CID 0130 //hgzhang //2008.10.02 //Comment
		var tagName = htmlField.tagName.toLowerCase();
		if( tagName == "input" || tagName == "textarea" || tagName == "select" ){
			if( value != null ){
				var type = htmlField.getAttribute( "type" );
				if( type != null && ( type == "checkbox" || type == "radio" ) ){
					if( value == "" ){
						htmlField.checked = false;
					}else{
						htmlField.checked = true;
					}
				}else{
					if( tagName == "textarea" ){
						value = InfoJet_FormatBr( value );
						htmlField.value = value;
						InfoJet_ResizeTextArea( htmlField, false );
					}else{
						htmlField.value = value;	
					}
				}
			}

			if( readonly.toLowerCase() == "true" ){
				htmlField.readOnly = true;
			}else{
				htmlField.readOnly = false;
			}
			if( disabled == "1" ){
				htmlField.disabled = true;
			}else{
				htmlField.disabled = false;
			}
		}else if( tagName == "span" ){
			if( value != null ){
				htmlField.innerHTML = value;
			}
		}else if( tagName == "a" ){
			if( value != null ){
				htmlField.href = value;
			}
		}
	}
}

function InfoJet_FormatEncodedHtml( encodedHtml ){
	var html = encodedHtml.replace( /\&lt;/g, "<" );
	html = html.replace( /\&gt;/g, ">" );
	return html;
}

function InfoJet_FormatBr( value ){
	value = value.replace( /\<BR>/g, "\r\n" );
	value = value.replace( /\<br>/g, "\r\n" );
	return value;
}

function InfoJet_SelectText( fieldId, controlId ){
	var field = document.getElementById( fieldId );
	if( field != null ){
		field.focus();
		field.scrollIntoView();
		field.focus();
	}
}

function InfoJet_SetXmlToEditFocus( fieldId ){
	var field = document.getElementById( fieldId );
	if( field != null ){
		if( InfoJet_IsTextControl( field ) ){
			field.focus();
			field.focus();
		}
	}
}

function InfoJet_RefreshXmlToEditItem( source , isSetItemId ){
	var focusMenuArrow = document.getElementById( "xdoc_menu_focus_arrow" );
	if( focusMenuArrow == null ){
		return null;
	}
	var itemXmlToEdits = InfoJet_GetItemXmlToEdits( source );
	if( itemXmlToEdits.xmlToEditNames.length > 0 ){
		var itemElement = itemXmlToEdits.itemElement;
		if( isSetItemId ){
			focusMenuArrow.setAttribute( "itemId" , InfoJet_GetElementId( itemElement ) );
			//itemHtmlId is used to hold the original html id of the element.
			//CID 0002 //2008.05.29 //Begin
			focusMenuArrow.setAttribute( "itemHtmlId", itemElement.id );
			//CID 0002 //2008.05.29 //End
		}
		return itemElement;
	}else{
		if( isSetItemId ){
			focusMenuArrow.setAttribute( "itemId" , document.getElementById( "xdoc_data_root_element_id" ).innerHTML );
			//CID 0002 //2008.05.29 //Begin
			focusMenuArrow.setAttribute( "itemHtmlId", "xdoc_view" );
			//CID 0002 //2008.05.29 //End
		}
		return null;
	}
}

function InfoJet_GetItemXmlToEdits( source ){
	var xmlToEditNames = document.getElementById( "xdoc_data_xmltoedit_name_array" ).innerHTML.split( ";" );
	var xmlToEditItems = new Array();
	for( var i = 0 ; i < xmlToEditNames.length ; i ++ ){
		var itemArrayField = document.getElementById( xmlToEditNames[ i ] + "_item" );
		if( itemArrayField != null ){
			var items = itemArrayField.innerHTML.split( ";" );
			var xmlToEditItem = new Object();
			xmlToEditItem.name = xmlToEditNames[ i ];
			xmlToEditItem.items = items;
			xmlToEditItems[ xmlToEditItems.length ] = xmlToEditItem;
		}
	}
	var itemXmlToEdits = new Object();
	itemXmlToEdits.xmlToEditNames = new Array();
	InfoJet_GetItemElement( itemXmlToEdits , xmlToEditItems , source );
	return itemXmlToEdits;
}

function InfoJet_GetItemElement( itemXmlToEdits , xmlToEditItems , source ){
	if( source == null || source.id == "xdoc_view" || source.tagName.toLowerCase() == "body" ){
		return;
	}
	for( var i = 0 ; i < xmlToEditItems.length ; i ++ ){
		var items = xmlToEditItems[ i ].items;
		for( var m = 0 ; m < items.length ; m ++ ){
			if( items[ m ] != "" ){
				if( InfoJet_GetElementId( source ) == items[ m ] ){
					itemXmlToEdits.xmlToEditNames[ itemXmlToEdits.xmlToEditNames.length ] = xmlToEditItems[ i ].name;
				}				
			}
		}
	}
	if( itemXmlToEdits.xmlToEditNames.length > 0 ){
		itemXmlToEdits.itemElement = source;
		return;
	}
	InfoJet_GetItemElement( itemXmlToEdits , xmlToEditItems , InfoJet_GetParent( source ) );
}

function InfoJet_OnKeyPress( event , control ){
	if( event.keyCode == 13 ){
		if( control.tagName.toLowerCase() == "textarea" ){
			var defaultRows = control.getAttribute( "default_rows" );
			if( defaultRows == "1" ){
				if( InfoJet_IsIE() ){
					event.returnValue = false;
				}else{
					event.preventDefault();
				}
				return;
			}
		}
	}
	if( InfoJet_IsTextControl( control ) ){
		var maxLengthList = document.getElementById( "xdoc_data_max_length_list" ).innerHTML;
		if( maxLengthList.length > 0 ){
			var maxLengthFields = maxLengthList.split( ";" );
			for( var i = 0 ; i < maxLengthFields.length ; i ++ ){
				var idMaxLength = maxLengthFields[ i ].split( "," );
				var id = idMaxLength[ 0 ];
				var maxLengthValue = idMaxLength[ 1 ];
				var controlId = InfoJet_GetElementId( control );
				if( controlId == id ){
					var maxLength = parseInt( maxLengthValue , 10 );
					if( control.value.length >= maxLength ){
						if( document.selection.createRange().text.length <= 0 ){
							if( InfoJet_IsIE() ){
								event.returnValue = false;
							}else{
								event.preventDefault();
							}
							break;
						}
					}
				}
			}
		}
	}
}

function InfoJet_TrimByMaxLength( control ){
	if( InfoJet_IsTextControl( control ) ){
		var maxLengthList = document.getElementById( "xdoc_data_max_length_list" ).innerHTML;
		if( maxLengthList.length > 0 ){
			var maxLengthFields = maxLengthList.split( ";" );
			for( var i = 0 ; i < maxLengthFields.length ; i ++ ){
				var idMaxLength = maxLengthFields[ i ].split( "," );
				var id = idMaxLength[ 0 ];
				var maxLengthValue = idMaxLength[ 1 ];
				var controlId = InfoJet_GetElementId( control );
				if( controlId == id ){
					var maxLength = parseInt( maxLengthValue , 10 );
					if( control.value.length > maxLength ){
						if( document.selection.createRange().text.length <= 0 ){
							control.value = control.value.substring(0, maxLength);
							break;
						}
					}
				}
			}
		}
	}
}

function InfoJet_OnKeyDown( event , control ){
	event = InfoJet_GetEvent( event );
	InfoJet_ResizeTextArea( control, true );
	if( InfoJet_OnKeyDown_xField( event , control ) ){
		return;
	}
	if( InfoJet_OnKeyDown_xTextList( event , control ) ){
		return;
	}
}

//CID 0048 //hgzhang //2008.07.17 //Begin
function InfoJet_OnKeyUp( event , control ){
	event = InfoJet_GetEvent( event );
	if( InfoJet_EnableReplaceGroupingSymbol ){
		InfoJet_ReplaceGroupingSymbol( event, control );
	}
}
//CID 0048 //hgzhang //2008.07.17 //End

//CID 0048 //hgzhang //2008.07.15 //Begin
function InfoJet_ReplaceGroupingSymbol( event, control ){
	var schemaType = control.getAttribute( "schema_type" );
	if( schemaType == "double" ){
		var groupingSymbol = control.getAttribute( "grouping_symbol" );
		if( groupingSymbol == null ){
			var dataFmtType = InfoJet_GetDataFmtType( control );
			if( dataFmtType == null || dataFmtType == "number" || dataFmtType == "percentage" ){
				if( InfoJet_GetNumSeparatorType() == "1" ){
					groupingSymbol = ','; //comma.
				}else{
					groupingSymbol = '.'; //dot.
				}
			}else if( dataFmtType == "currency" ){
				var localeId = InfoJet_GetDataFmtFacetValue( control, "currencyLocale" );
				var separatorType = InfoJet_GetCurSeparatorType( localeId );
				if( separatorType != null ){
					if( separatorType == "1" ){
						groupingSymbol = ','; //comma.
					}else{
						groupingSymbol = '.'; //dot.
					}
				}
			}
			if( groupingSymbol != null ){
				control.setAttribute( "grouping_symbol", groupingSymbol );
			}
		}
		if( groupingSymbol != null ){
			if( control.value.indexOf(groupingSymbol) >= 0 ){
				if( groupingSymbol == "," ){
					control.value = control.value.replace(/\,/g, ".");
				}else{
					control.value = control.value.replace(/\./g, ",");
				}
			}
		}
	}
}
//CID 0048 //hgzhang //2008.07.15 //End

//CID 0048 //hgzhang //2008.07.15 //Begin
function InfoJet_GetDataFmtType( element ){
	var datafmt = element.getAttribute( InfoJet_XdPrefix + "datafmt" );
	if( datafmt == null || datafmt.length <= 0 ){
		return null;
	}
	var typeParam = datafmt.split( "\",\"" );
	if( typeParam.length >= 2 ){
		var type = typeParam[ 0 ];
		type = type.substr( 1, type.length - 1 );
		return type;
	}
	return null;
}
//CID 0048 //hgzhang //2008.07.15 //End

//CID 0048 //hgzhang //2008.07.15 //Begin
function InfoJet_GetDataFmtFacetValue( element, targetFaceName ){
	var datafmt = element.getAttribute( InfoJet_XdPrefix + "datafmt" );
	if( datafmt == null || datafmt.length <= 0 ){
		return null;
	}
	var typeParam = datafmt.split( "\",\"" );
	if( typeParam.length >= 2 ){
		var type = typeParam[ 0 ];
		var param = typeParam[ 1 ];
		type = type.substr( 1, type.length - 1 );
		param = param.substr( 0, param.length - 2 );
		
		var params = param.split( ";" );
		for( var i = 0; i < params.length; i ++ ){
			var facet = params[ i ];
			if( facet.length > 0 ){
				var facetNameValue = facet.split( ":" );
				if( facetNameValue.length >= 2 ){
					var facetName = facetNameValue[ 0 ];
					var facetValue = facetNameValue[ 1 ];
					if( facetName == targetFaceName ){
						return facetValue;
					}
				 }
			}
		}
	}
	return null;
}
//CID 0048 //hgzhang //2008.07.15 //End

function InfoJet_OnKeyDown_xField( event , control ){
	var tagName = control.tagName.toLowerCase();
	if( event.keyCode == 13 ){
		if( InfoJet_IsIdInArray( InfoJet_GetElementId( control ) , "xdoc_data_nobreak_id_array" ) ){
			if( tagName == "textarea" ){
				event.returnValue = false;
				return true;
			}
		}
	}
	return false;
}

function InfoJet_ResizeTextArea( textArea, isRefreshBorder ) 
{
	var tagName = textArea.tagName.toLowerCase();
	if( tagName != "textarea" ){
		return;
	}
	if( textArea.getAttribute( "hasScrollBar" ) == "true" ){
		return;
	}
	
	var defaultRows = textArea.getAttribute( "default_rows" );
	var datafmt = textArea.getAttribute( InfoJet_XdPrefix + "datafmt" );
	//CID 0080 //hgzhang //2008.08.04 //Begin
	if( defaultRows != null && defaultRows == "1" ){
		return;
	}
	//CID 0080 //hgzhang //2008.08.04 //End
	
	var text = textArea.value; 
	var length = text.length; 
	var rows = 1; 

	var last = 0;
	for( var i = 0; i < length ; i++ ){ 
		if( text.charAt(i).charCodeAt(0) == 13 ){ 
			if( i - last > textArea.cols ){
				rows = rows + ( (i - last) / textArea.cols ) + 1;
			}else{
				rows = rows + 1;
			}
			last = i;
		}
	} 

	if( text.indexOf( "\n" ) < 0 ){
		rows = length / textArea.cols + 1;
	}
	
	//CID 0097 //hgzhang //2008.08.21 //Begin
	//if( defaultRows != null && defaultRows == "3" && rows < 3 ){
	//	rows = 3;
	//}
	//CID 0097 //hgzhang //2008.08.21 //End

	var oldRows = textArea.rows;
	//CID 0097 //hgzhang //2008.08.21 //if
	if( textArea.style.cssText.indexOf( "OVERFLOW-Y: scroll;OVERFLOW-X: scroll;" ) < 0 ){
		textArea.rows = rows; 
	}
	if( isRefreshBorder && oldRows != rows ){
		InfoJet_HideBorder( "xdoc_field_over" );
		InfoJet_HideBorder( "xdoc_item_over" );
		InfoJet_ShowFieldBorder( textArea , "xdoc_field_focus" );
		if( InfoJet_ItemElement != null ){
			InfoJet_ShowFocusMenuArrow( InfoJet_ItemElement );
			InfoJet_ShowSectionBorder( InfoJet_ItemElement , "xdoc_item_focus" );
		}
	}
	
	//CID 0113 //hgzhang //2008.09.09 //Begin
	InfoJet_RelayoutFieldStyles();
	//CID 0113 //hgzhang //2008.09.09 //End
} 

function InfoJet_OnKeyDown_xTextList( event , control ){
	var key = event.keyCode;
	if( key == 13 || key == 8 ){
		var listIds = document.getElementById( "xdoc_data_list_id_array" ).innerHTML.split( ";" );
		for( index = 0 ; index < listIds.length ; index ++ ){
			var xId = listIds[ index ];
			var id = InfoJet_GetElementId( control );
			if( xId.indexOf( id ) == 0 ){
				InfoJet_UpdateField( control );
				InfoJet_RefreshContext( control );
				var xmlToEditName = xId.substr( id.length + 1 );
				document.getElementById( "xdoc_param_xtextlist_item" ).value = id; 
				document.getElementById( "xdoc_param_xml_to_edit_name" ).value = xmlToEditName;
				if( key == 13 ){
					document.getElementById( "xdoc_param_xml_to_edit_action" ).value = "xTextList::newItem";
				}else if( key == 8 ){
					if( control.value.length > 0 ){
						return false;
					}
					document.getElementById( "xdoc_param_xml_to_edit_action" ).value = "xTextList::deleteItem";
				}
				document.getElementById( "xdoc_param_command" ).value = "Update_XmlToEdit";
				InfoJet_Submit();
				event.returnValue = false;
				return true;
			}
		}
	}
	return false;
}

function InfoJet_RemoveFile( source ){
	//CID 0047 //hgzhang //2008.07.24 //Begin
	source.innerHTML = InfoJet_SelectFileMessage;
	//CID 0047 //hgzhang //2008.07.24 //End
	source.href = "javascript:void(0)";
	var file = document.getElementById( "xdoc" + source.id );
	if( file != null ){
		file.value = "";
	}
	var name = document.getElementById( "xdoc" + source.id + "_name" );
	if( name != null ){
		name.value = "";
	}
	var link = document.getElementById( "xdoc" + source.id + "_link" );
	if( link != null ){
		link.value = "";
	}
}

function InfoJet_AttachFile( fileAttachment ){
	//CID 0002 //hgzhang //2008.06.04 //Begin
	var fileAttachmentSpan = InfoJet_GetParent( fileAttachment );
	if( fileAttachmentSpan != null ){
		var disableEditing = fileAttachmentSpan.getAttribute( InfoJet_XdPrefix + "disableEditing" );
		if( disableEditing != null && disableEditing.toLowerCase() == "yes" ){
			return;
		}
	}
	//CID 0002 //hgzhang //2008.06.04 //End
	if( InfoJet_IsFuncDefined( "InfoJetCustom_AttachFile" ) ){
		//CID 0033 //hgzhang //2008.06.28 //Begin
		var formId = document.getElementById( "xdoc_param_form_id" ).value;
		eval( "InfoJetCustom_AttachFile( fileAttachment, formId );" );
		//CID 0033 //hgzhang //2008.06.28 //End
		return;
	}
	//CID 0033 //hgzhang //2008.06.28 //Begin
	var formId = document.getElementById( "xdoc_param_form_id" ).value;
	//CID 0030 //hgzhang //2008.07.14 //Begin
	var uploadedFile = window.showModalDialog( InfoJet_WebContext + "js/uploadfile_dialog.htm", new Array( window, fileAttachment, formId ), 'dialogWidth:470px;dialogHeight:125px;help:no;' );
	if( uploadedFile != null ){
		InfoJet_LinkUploadedFile( fileAttachment, uploadedFile );
	}
	//CID 0030 //hgzhang //2008.07.14 //End
	//CID 0033 //hgzhang //2008.06.28 //End
}

//CID 0030 //hgzhang //2008.07.14 //Begin
function InfoJet_LinkUploadedFile( fileAttachment, uploadedFile ){
	var pureId = InfoJet_GetPureId( fileAttachment.id );
	if( fileAttachment.href == null )
	{
		fileAttachment = document.getElementById( pureId + ',1' );
	}
	var linkPath = uploadedFile.path;
	fileAttachment.href = linkPath;
	var name = uploadedFile.name;
	var size = uploadedFile.size;
	//CID 0045 //hgzhang //2008.07.14 //Begin
	fileAttachment.innerHTML = name + ' ' + size;
	//CID 0045 //hgzhang //2008.07.14 //End
	var file = document.getElementById( 'xdoc' + pureId );
	if( file != null )
	{
		file.value = uploadedFile.content;
	}
	var xdocForm = document.getElementById( 'xdoc_form' );
	var fileName = document.getElementById( pureId + '_name' );
	if( fileName != null )
	{
		fileName.value = name;
	}
	else
	{
		var nameHtml = '<input type=hidden id=' + pureId  + '_name name=' + pureId + '_name value=' + name + '>';
		InfoJet_InsertAdjacentHTMLBeforeEnd( xdocForm, nameHtml );
	}
	var fileSize = document.getElementById( pureId + '_size' );
	if( fileSize != null )
	{
		fileSize.value = size;
	}
	else
	{
		var sizeHtml = '<input type=hidden id=' + pureId  + '_size name=' + pureId + '_size value=' + size + '>';
		InfoJet_InsertAdjacentHTMLBeforeEnd( xdocForm, sizeHtml );
	}
	var fileLink = document.getElementById( pureId + '_link' );
	if( fileLink != null )
	{
		fileLink.value = linkPath;
	}
	else
	{
		var linkHtml = '<input type=hidden id=' + pureId  + '_link name=' + pureId + '_link value=' + fileAttachment.href + '>';
		InfoJet_InsertAdjacentHTMLBeforeEnd( xdocForm, linkHtml );
	}
}
//CID 0030 //hgzhang //2008.07.14 //End

//Event Hanlder Build
function InfoJet_BuildMouseOutHandler(){
	var onMouseOut = null;
	if( InfoJet_IsIE() ){
		onMouseOut = function(){ InfoJet_OnMouseOut(null,this); };
	}else{
		onMouseOut = function(event){ InfoJet_OnMouseOut(event,this); };
	}
	return onMouseOut;
}

function InfoJet_BuildDocMouseOutHandler(){
	var onMouseOut = null;
	if( InfoJet_IsIE() ){
		onMouseOut = function(){ InfoJet_OnMouseOut(window.event,window.event.srcElement); };
	}else{
		onMouseOut = function(event){ InfoJet_OnMouseOut(event,event.target); };
	}
	return onMouseOut;
}


function InfoJet_BuildMouseOverHandler(type){
	var onMouseOver = null;
	if( InfoJet_IsIE() ){
		onMouseOver = function(){ InfoJet_OnMouseOver(null,this,type); };
	}else{
		onMouseOver = function(event){ InfoJet_OnMouseOver(event,this,type); };
	}
	return onMouseOver;
}

function InfoJet_BuildDocMouseOverHandler(type){
	var onMouseOver = null;
	if( InfoJet_IsIE() ){
		onMouseOver = function(){ InfoJet_OnMouseOver(window.event,window.event.srcElement,type); };
	}else{
		onMouseOver = function(event){ InfoJet_OnMouseOver(event,event.target,type); };
	}
	return onMouseOver;
}

function InfoJet_BuildBlurHandler(type){
	var onBlur = null;
	if( InfoJet_IsIE() ){
		onBlur = function(){ InfoJet_OnBlur(null,this,type); };
	}else{
		onBlur = function(event){ InfoJet_OnBlur(event,this,type); };
	}
	return onBlur;
}

function InfoJet_BuildDocBlurHandler(type){
	var onBlur = null;
	if( InfoJet_IsIE() ){
		onBlur = function(){ InfoJet_OnBlur(window.event,window.event.srcElement,type); };
	}else{
		onBlur = function(event){ InfoJet_OnBlur(event,event.target,type); };
	}
	return onBlur;
}

function InfoJet_BuildFocusHandler(type){
	var onFocus = null;
	if( InfoJet_IsIE() ){
		onFocus = function(){ InfoJet_OnFocus(null,this,type); };
	}else{
		onFocus = function(event){ InfoJet_OnFocus(event,this,type); };
	}
	return onFocus;
}

function InfoJet_BuildDocFocusHandler(type){
	var onFocus = null;
	if( InfoJet_IsIE() ){
		onFocus = function(){ InfoJet_OnFocus(window.event,window.event.srcElement,type); };
	}else{
		onFocus = function(event){ InfoJet_OnFocus(event,event.target,type); };
	}
	return onFocus;
}

function InfoJet_BuildDocClickHandler(type){
	var onClick = null;
	if( InfoJet_IsIE() ){
		//CID 0132 //hgzhang //2008.10.04 //Begin
		onClick = function(){ if( event.srcElement.onclick == null ){ InfoJet_OnClick(window.event,window.event.srcElement,type); } };
		//CID 0132 //hgzhang //2008.10.04 //End
	}else{
		//CID 0132 //hgzhang //2008.10.04 //Begin
		onClick = function(event){ if( event.target.onclick == null ){ InfoJet_OnClick(event,event.target,type); } };
		//CID 0132 //hgzhang //2008.10.04 //End
	}
	return onClick;
}

function InfoJet_BuildContextMenuHandler(){
	var onContextMenu = null;
	if( InfoJet_IsIE() ){
		onContextMenu = function(){ InfoJet_OnContextMenu(null,this); };
	}else{
		onContextMenu = function(event){ return InfoJet_OnContextMenu(event,this); };
	}
	return onContextMenu;
}

function InfoJet_BuildDocContextMenuHandler(){
	var onContextMenu = null;
	if( InfoJet_IsIE() ){
		onContextMenu = function(){ InfoJet_OnContextMenu(window.event,window.event.srcElement); };
	}else{
		onContextMenu = function(event){ return InfoJet_OnContextMenu(event,event.target); };
	}
	return onContextMenu;
}

function InfoJet_BuildMenuArrowPointHandler( type ){
	var onMenuArrowPoint = null;
	if( InfoJet_IsIE() ){
		onMenuArrowPoint = function(){ InfoJet_OnMenuArrowPoint(null,this,type); };
	}else{
		onMenuArrowPoint = function(event){ return InfoJet_OnMenuArrowPoint(event,this,type); };
	}
	return onMenuArrowPoint;
}

function InfoJet_FormatTextArea(){
	var taIdArray = document.getElementById( "xdoc_data_textarea_id_array" ).innerHTML;
	var taIds = taIdArray.split( ";" );
	for( var i = 0 ; i < taIds.length ; i ++ ){
		var taId = taIds[ i ];
		if( taId.length > 0 ){
			var textArea = document.getElementById( taId );
			if( textArea != null ){
				InfoJet_ResizeTextArea( textArea, false );
			}
		}
	}
}

function InfoJet_FormatDTPicker(){
	//设置InfoJet_ShortDatePattern,InfoJet_LongDatePattern,InfoJet_YearMonthPattern
	InfoJet_ShortDatePattern = document.getElementById( "xdoc_data_short_date_pattern" ).innerHTML;
	InfoJet_LongDatePattern = document.getElementById( "xdoc_data_long_date_pattern" ).innerHTML;
	InfoJet_YearMonthPattern = document.getElementById( "xdoc_data_year_month_pattern" ).innerHTML;
	var dtpIdArray = document.getElementById( "xdoc_data_datepicker_id_array" ).innerHTML;
	var dtpIds = dtpIdArray.split( ";" );
	for( var i = 0 ; i < dtpIds.length ; i ++ ){
		var dtpId = dtpIds[ i ]
		if( dtpId.length > 0 ){
			var datePicker = document.getElementById( dtpId );
			if( datePicker != null ){
				InfoJet_SetupDTPicker( datePicker );
			}
		}
	}
	InfoJet_ReformatDTPicker();
}

function InfoJet_SetupDTPicker( element ){
	var parentElement = InfoJet_GetParent( element );
	var children = InfoJet_GetAllChildren( parentElement );
	var button = null;
	var input = element;
	var dateFormat = InfoJet_GetDateFormat( input );
	for( var c = 0 ; c < children.length ; c ++ ){
		var subElement = children[ c ];
		if( subElement.tagName.toLowerCase() == "button" && subElement.className == "xdDTButton" ){
			button = subElement;
			button.onclick = "javascript:void(0);";
			button.style.display = "";
			input.dtButton = button;
			break;
		}
	}
	if( button != null ){
		Calendar.setup({
     		xdocInputField :   element ,
       		ifFormat       :   dateFormat,
        	showsTime      :   false,
        	xdocButton     :   button,
        	singleClick    :   true,
        	step           :   1
		});
		//CID 0050 //hgzhang //2008.07.18 //Begin
		InfoJet_AlignDTPickerButton( parentElement, input, button );
		//CID 0050 //hgzhang //2008.07.18 //End
    }
}

//CID 0050 //hgzhang //2008.07.18 //Begin
function InfoJet_AlignDTPickerButton( parentElement, input, button ){
	if( InfoJet_IsIE() ){
		input.style.top = parentElement.clientTop;
		if( parentElement.clientWidth - button.offsetWidth - 3 > 0 ){
			input.style.width = parentElement.clientWidth - button.offsetWidth - 3;
		}
		if( parentElement.clientHeight - 2 > 0 ){
			input.style.height = parentElement.clientHeight - 2;
			//CID 0121 //hgzhang //2008.09.26 //Begin
			input.style.lineHeight = input.style.height;
			//CID 0121 //hgzhang //2008.09.26 //End
		}
	}else{
		//CID 0057 //hgzhang //2008.07.19 //Begin
		var parentWidth = InfoJet_GetStylePixelSize( parentElement , "width" , "width" );;
		input.style.width = parentWidth - button.offsetWidth - 2;
		parentElement.style.paddingTop = "2px";
		parentElement.style.paddingBottom = "2px";
		//CID 0057 //hgzhang //2008.07.19 //End
	}
}
//CID 0050 //hgzhang //2008.07.18 //End

//CID 0050 //hgzhang //2008.07.18 //Begin
function InfoJet_ReformatDTPicker(){
	//Reformat dtPicker only while there are master-detail contols.
	var masterDetials = document.getElementById( "xdoc_param_master_detial" ).value;
	if( masterDetials.length <= 0 ){
		return;
	}
	var dtpIdArray = document.getElementById( "xdoc_data_datepicker_id_array" ).innerHTML;
	var dtpIds = dtpIdArray.split( ";" );
	for( var i = 0 ; i < dtpIds.length ; i ++ ){
		var dtpId = dtpIds[ i ]
		if( dtpId.length > 0 ){
			var datePicker = document.getElementById( dtpId );
			if( datePicker != null ){
				var parentElement = InfoJet_GetParent( datePicker );
				if( datePicker.dtButton != null ){
					InfoJet_AlignDTPickerButton( parentElement, datePicker, datePicker.dtButton );
				}
			}
		}
	}
}
//CID 0050 //hgzhang //2008.07.18 //End

function InfoJet_BuildMenuArrowPoint(){
	var readonlyView = false;
	var xdocArrow = document.getElementById( "xdoc_arrow" );
	if( xdocArrow.innerHTML == "ReadonlyView" ){
		readonlyView = true;
	}
	
	var content = "<div id='xdoc_menu_focus_arrow' style='display: none;Z-INDEX: 98;POSITION: absolute;'>";
	content += "<img id='xdoc_menu_focus_arrow_img' src='" + InfoJet_WebContext + "images/infojet_transparent.gif'></img></div>";
	
	//CID 0010 //hgzhang //2008.06.05 //Begin
	//content += "<div id='xdoc_menu_over_arrow' style='display: none;Z-INDEX: 97;POSITION: absolute;'>";
	//content += "<img id='xdoc_menu_over_arrow_img' src='" + InfoJet_WebContext + "images/infojet_transparent.gif'></img></div>";
	//CID 0010 //hgzhang //2008.06.05 //End
	
	xdocArrow.innerHTML = content;
	
	var menuArrow = document.getElementById( "xdoc_menu_focus_arrow" );
	menuArrow.onblur = function(){ InfoJet_OnBlur("menu"); };
	menuArrow.onclick = InfoJet_BuildMenuArrowPointHandler("arrow");
	menuArrow.oncontextmenu = InfoJet_BuildMenuArrowPointHandler("arrow");
	
	//如果是ReadonlyView.
	if( readonlyView ){
		menuArrow.onclick = "javascript:void(0)";
		menuArrow.oncontextmenu = "javascript:void(0)";
	}
}

function InfoJet_Init(){
    try{
        initialRichTextBox();
    }catch(e){}
	var xdoc = document.getElementById( "xdoc" );
	if( !xdoc ){
		return;
	}
	//设置InfoJet_XdPrefix
	InfoJet_XdPrefix = document.getElementById( "xdoc_data_xd_prefix" ).innerHTML;
	
	var menu = document.getElementById( "xdoc_data_menu" );
	var menuHtml = menu.getAttribute( "html" );
	if( menuHtml.length > 0 ){
		var xdocMenu = document.getElementById( "xdoc_menu" );
		if( xdocMenu != null ){
			//CID 0020 //hgzhang //2008.06.20 //Begin
			InfoJet_RemoveHtmlElement( xdocMenu ); //unreachable code //CID 0020 //hgzhang //2008.06.20 //comment
			//CID 0020 //hgzhang //2008.06.20 //End
		}
		//document.body.insertAdjacentHTML( "BeforeEnd", menuHtml );
		//CID 0017 //hgzhang //2008.06.16 //Begin
		InfoJet_InsertAdjacentHTMLBeforeEnd( document.body, menuHtml );
		//CID 0017 //hgzhang //2008.06.16 //End
	}
	var style = document.getElementById( "xdoc_fieldstyle" );
	if( style != null ){
		style.innerHTML = "";
	}else{
		//document.body.insertAdjacentHTML( "BeforeEnd", "<div id='xdoc_fieldstyle' style='width:0px;height:0px;'></div>" );
		//CID 0017 //hgzhang //2008.06.16 //Begin
		InfoJet_InsertAdjacentHTMLBeforeEnd( document.body, "<div id='xdoc_fieldstyle' style='width:0px;height:0px;'></div>" );
		//CID 0017 //hgzhang //2008.06.16 //End
	}
	var focus = document.getElementById( "xdoc_focusover" );
	if( focus == null ){
		//document.body.insertAdjacentHTML( "BeforeEnd", "<div id='xdoc_focusover' style='width:0px;height:0px;'></div>" );
		//CID 0017 //hgzhang //2008.06.16 //Begin
		InfoJet_InsertAdjacentHTMLBeforeEnd( document.body, "<div id='xdoc_focusover' style='width:0px;height:0px;'></div>" );
		//CID 0017 //hgzhang //2008.06.16 //End
	}
	var arrow = document.getElementById( "xdoc_arrow" );
	if( arrow == null ){
		//document.body.insertAdjacentHTML( "BeforeEnd", "<div id='xdoc_arrow' style='width:0px;height:0px;'></div>" );
		//CID 0017 //hgzhang //2008.06.16 //Begin
		InfoJet_InsertAdjacentHTMLBeforeEnd( document.body, "<div id='xdoc_arrow' style='width:0px;height:0px;'></div>" );
		//CID 0017 //hgzhang //2008.06.16 //End
	}
	
	InfoJet_BuildMenuArrowPoint();
	InfoJet_BuildFocusOverBorder();
	
	InfoJet_BuildProgress();
	
	document.onclick = InfoJet_BuildDocClickHandler('common');
	document.oncontextmenu = InfoJet_BuildDocContextMenuHandler('common');
	document.onblur = InfoJet_BuildDocBlurHandler('common');
	
	if( !InfoJet_BrowserQuick ){	
		document.onmouseover = InfoJet_BuildDocMouseOverHandler('common');
		document.onmouseout = InfoJet_BuildDocMouseOutHandler();
	}

	InfoJet_FormatDTPicker();
	InfoJet_FormatTextArea();
	if( !InfoJet_NoValidation ){
		InfoJet_ShowAllErrors();
	}
	InfoJet_HiddenAllGroupMenu();
	InfoJet_ResetSwitchViewMenuCheck();
	InfoJet_HideOverBorderArrow();
	InfoJet_HideFocusBorderArrow();
	window.onresize = InfoJet_OnWindowResize;
	
	if( InfoJet_FuncAfterInit != null ){
		InfoJet_FuncAfterInit = null;
		eval( InfoJet_FuncAfterInit );
	}
	
	InfoJet_ValueChanging = 0;
	InfoJet_Inited();
	
	InfoJet_BuildXDocumentDOM();
	Page_ReadyState_Ajax();
}

function InfoJet_Inited(){
	var xdoc = document.getElementById( "xdoc" );
	xdoc.setAttribute( "inited" , "true" );
}

function InfoJet_IsInited(){
	var xdoc = document.getElementById( "xdoc" );
	var inited = xdoc.getAttribute( "inited" );
	if( inited != null && inited == "true" ){
		return true;
	}else{
		return false;
	}
}

function InfoJet_ReloadForm(){
	var frameDocument = InfoJet_GetFrameDocument( "xdoc_frame" );
	var frameView = frameDocument.getElementById('xdoc_view');
	var frameForm = frameDocument.getElementById('xdoc_form');
	var frameData = frameDocument.getElementById('xdoc_data');
	if( frameView.value.length > 0 ){
		document.getElementById('xdoc_view').innerHTML = frameView.value;
	}
	document.getElementById('xdoc_form').innerHTML = frameForm.value;
	document.getElementById('xdoc_data').innerHTML = frameData.value;
	InfoJet_Init();
	InfoJet_Changed = true;
}

function InfoJet_ReloadFormVars( viewHtml, formHtml, dataHtml ){
	if( viewHtml.length > 0 ){
		document.getElementById('xdoc_view').innerHTML = viewHtml;
	}
	document.getElementById('xdoc_form').innerHTML = formHtml;
	document.getElementById('xdoc_data').innerHTML = dataHtml;
	InfoJet_Init();
	InfoJet_Changed = true;
}

function InfoJet_OnWindowResize(){
	//CID 0113 //hgzhang //2008.09.09 //Begin
	InfoJet_RelayoutFieldStyles();
	//CID 0113 //hgzhang //2008.09.09 //End
	if( typeof(Custom_InfoJetWebFormHost_OnWindowResize) != "undefined" ){
		eval( "Custom_InfoJetWebFormHost_OnWindowResize();" );
	}
}

//CID 0113 //hgzhang //2008.09.09 //Begin
function InfoJet_RelayoutFieldStyles(){
	var xdocFieldStyles = document.getElementById( "xdoc_fieldstyle" );
	if( xdocFieldStyles == null ){
		return;
	}
	var fieldStyles = InfoJet_CollectChildren( xdocFieldStyles );
	var invalidateFieldIds = new Array();
	var notBlankFieldIds = new Array();
	for( var index = 0; index < fieldStyles.length; index ++ ){
		var fieldStyle = fieldStyles[index];
		if( fieldStyle.tagName.indexOf( "/" ) < 0 ){
			var fieldId = fieldStyle.id;
			if( fieldId.lastIndexOf( "_top" ) == (fieldId.length - 4) ){
				if( parseInt(fieldStyle.style.height) > 0 || parseInt(fieldStyle.style.width) > 0 ){
					invalidateFieldIds[ invalidateFieldIds.length ] = fieldId.substr( 0, fieldId.length - 4 );
				}
			}
			if( fieldId.lastIndexOf( "_notBlank" ) == (fieldId.length - 9) ){
				if( fieldStyle.style.display != "none" ){
					notBlankFieldIds[ notBlankFieldIds.length ] = fieldId.substr( 0, fieldId.length - 9 );
				}
			}
		}
	}
	for( var index = 0; index < invalidateFieldIds.length; index ++ ){
		var field = document.getElementById( invalidateFieldIds[ index ] );
		if( field != null ){
			InfoJet_ShowInvalidateBorder( field, field.id );
		}
	}
	for( var index = 0; index < notBlankFieldIds.length; index ++ ){
		var field = document.getElementById( notBlankFieldIds[ index ] );
		if( field != null ){
			InfoJet_ShowNotBlankMark( field );
		}
	}
}
//CID 0113 //hgzhang //2008.09.09 //End

function InfoJet_SetViewReadonly(){
	var allViewElements = InfoJet_GetAllChildren( document.getElementById( "xdoc_view" ) );
	for( var i = 0; i < allViewElements.length; i++ ) {
		var element = allViewElements[ i ];
		if( element.tagName.toLowerCase() == "input" ){
			var type = element.getAttribute( "type" );
			if( type != null ){
				type = type.toLowerCase();
				if( type == "text" || type == "password" ){
					element.readOnly = true;
					element.contentEditable = false;
				}else{
					element.disabled = true;
				}
			}else{
				element.disabled = true;
			}
		}else if( element.tagName.toLowerCase() == "textarea" ){
			element.readOnly = true;
			element.contentEditable = false;
		}else if( element.tagName.toLowerCase() == "select" ){
			element.disabled = true;
		}else if( element.tagName.toLowerCase() == "button" ){
			element.disabled = true;
		}else if( element.className == "xdInlinePicture" ){
			element.disabled = true;
		}else if( element.className == "xdLinkedPicture" ){
			element.disabled = true;
		}else if( element.className == "xdFileAttachmentLink" ){
			var href = element.href;
			if( href.indexOf( "javascript:void(0)" ) == 0 ){
				element.onclick = null;
			}else{
				element.setAttribute( "fileHref", href );
				element.href = "javascript:void(0)";
				element.onclick = function(){ window.open( this.fileHref ); };
			}
		}else if( element.className == "optionalPlaceholder" ){
			element.disabled = true;
		}
    }
}

//Called in InfoJet_Init().
function InfoJet_BuildXDocumentDOM(){
	var dataXml = document.getElementById( "xdoc_data_xml" );
	if( dataXml != null ){
		var xml = dataXml.getAttribute( "xml" );
		InfoJet_XDocumentDOM = new ActiveXObject('Msxml2.DOMDocument.3.0');
		if( InfoJet_XDocumentDOM == null ){
			return;
		}
		InfoJet_XDocumentDOM.loadXML(xml);
	}else{
		InfoJet_XDocumentDOM = null;
	}
}

//Called in the value change postback response.
function InfoJet_LoadXDocumentDOM( xml ){
	var dataXml = document.getElementById( "xdoc_data_xml" );
	if( dataXml != null )
	{
		dataXml.innerHTML = xml;
		var innerXml = dataXml.innerHTML;
		dataXml.innerHTML = "";
		if( InfoJet_XDocumentDOM != null ){
			InfoJet_XDocumentDOM.loadXML(innerXml);
		}
	}
}

function InfoJet_UpdateXDocumentDOM( xmlField ){
	if( InfoJet_XDocumentDOM != null ){
		var ids = xmlField.id.split( "@" );
		var elementId = ids[0].replace( "xdoc", "" );
		var element = InfoJet_XDocumentDOM.selectSingleNode( "//*[@JetId='" + elementId + "']" );
		if( element != null ){
			if( ids.length == 1 ){
				element.text = xmlField.value;
			}else{
				element.setAttribute( ids[1], xmlField.value );
			}
		}
	}
}

function InfoJet_UpdateFormFieldByDOMNode( node ){
	var jetId = null;
	var value = null;
	if( node.nodeType == 1 ){
		jetId = node.getAttribute( "JetId" );
		value = node.text;
	}else if( node.nodeType == 2 ){
		var element = node.selectSingleNode( ".." );
		jetId = element.getAttribute( "JetId" );
		jetId = jetId + "@" + node.nodeName;
		value = node.value;
	}
	var xmlField = document.getElementById( "xdoc" + jetId );
	xmlField.value = value;
	var firstHtmlField = null;
	for( var n = 0 ; true ; n ++ ){
		var htmlId = jetId;
		if( n != 0 ){
			htmlId = htmlId + "," + n;
		}
		var htmlField = document.getElementById( htmlId );
		if( htmlField == null ){
			break;
		}else{
			if( n == 0 ){
				firstHtmlField = htmlField;
			}
			var tagName = htmlField.tagName.toLowerCase();
			if( tagName == "select" ){
				htmlField.value = value;
			}else if( tagName == "img" ){
				htmlField.src = value;
			}else if( tagName == "input" ){
				var type = htmlField.type.toLowerCase();
				if( type == "text" || type == "password" ){
					htmlField.setAttribute( "xml_value", value );
					htmlField.value = value;
				}else if( type == "checkbox" ){
					var onValue = InfoJet_GetOnOffValue( htmlField, true );
					var offValue = InfoJet_GetOnOffValue( htmlField, false );
					if( onValue == value ){
						htmlField.checked = true;
					}
					if( offValue == value ){
						htmlField.checked = false;
					}
				}else if( type == "radio" ){
					var onValue = InfoJet_GetOnOffValue( htmlField, true );
					if( onValue == value ){
						htmlField.checked = true;
					}else{
						htmlField.checked = false;
					}
				}
			}else if( tagName == "textarea" ){
				//CID 0092 //hgzhang //2008.08.14 //Begin
				htmlField.setAttribute( "xml_value", value );
				//CID 0092 //hgzhang //2008.08.14 //End
				htmlField.value = value;
			}
		}
		if( firstHtmlField != null ){
			InfoJet_OnControlChange( null, firstHtmlField );
		}
	}
}

//-------------------------------------------------
function InfoJet_GetDateFormat( element ){
	var datafmt = element.getAttribute( InfoJet_XdPrefix + "datafmt" );
	if( datafmt == null || datafmt.length <= 0 ){
		return "%Y-%m-%d";
	}
	var typeParam = datafmt.split( "\",\"" );
	if( typeParam.length >= 2 ){
		var type = typeParam[ 0 ];
		var param = typeParam[ 1 ];
		type = type.substr( 1, type.length - 1 );
		param = param.substr( 0, param.length - 2 );
		
		var params = param.split( ";" );
		for( var i = 0; i < params.length; i ++ ){
			var facet = params[ i ];
			if( facet.length > 0 ){
				var facetNameValue = facet.split( ":" );
				if( facetNameValue.length >= 2 ){
					var facetName = facetNameValue[ 0 ];
					var facetValue = facetNameValue[ 1 ];
					if( facetName == "dateFormat" ){
						dateFormat = facetValue;
						if( dateFormat.length <= 0 ){
							return "%Y-%m-%d";
						}
						if( dateFormat == "Long Date" ){
							dateFormat = InfoJet_LongDatePattern;
						}
						if( dateFormat == "Year Month" ){
							dateFormat = InfoJet_YearMonthPattern;
						}
						if( dateFormat == "Short Date" ){
							dateFormat = InfoJet_ShortDatePattern;
						}
						if( dateFormat.indexOf( "dddd" ) >= 0 ){
							return "%Y-%m-%d";
						}
						if( dateFormat.indexOf( "MMMM" ) >= 0 ){
							return "%Y-%m-%d";
						}
						if( dateFormat.indexOf( "MMM" ) >= 0 ){
							return "%Y-%m-%d";
						}
						dateFormat = dateFormat.replace( /\'/g, "" );
						if( dateFormat.indexOf( "yyyy" ) >= 0 ){
							dateFormat = dateFormat.replace( "yyyy", "%Y" );
						}else if( dateFormat.indexOf( "yy" ) >= 0 ){
							dateFormat = dateFormat.replace( "yy", "%Y" );
						}
						if( dateFormat.indexOf( "MM" ) >= 0 ){
							dateFormat = dateFormat.replace( "MM", "%m" );
						}else if( dateFormat.indexOf( "M" ) >= 0 ){
							dateFormat = dateFormat.replace( "M", "%m" );
						}
						if( dateFormat.indexOf( "dd" ) >= 0 ){
							dateFormat = dateFormat.replace( "dd", "%d" );
						}else if( dateFormat.indexOf( "d" ) >= 0 ){
							dateFormat = dateFormat.replace( "d", "%d" );
						}
						return dateFormat;
					}
				 }
			}
		}
	}
	return "%Y-%m-%d";
}
function InfoJet_DataFmt( element ){
	var datafmt = element.getAttribute( InfoJet_XdPrefix + "datafmt" );
	if( datafmt == null || datafmt.length <= 0 ){
		return 0;
	}
	var typeParam = datafmt.split( "\",\"" );
	if( typeParam.length >= 2 ){
		var type = typeParam[ 0 ];
		var param = typeParam[ 1 ];
		type = type.substr( 1, type.length - 1 );
		param = param.substr( 0, param.length - 2 );
		
		var numDigits = "", grouping = "", negativeOrder = "", positiveOrder = "", currencyLocale = "", locale = "", dateFormat = "", timeFormat = "";
		var params = param.split( ";" );
		for( var i = 0; i < params.length; i ++ ){
			var facet = params[ i ];
			if( facet.length > 0 ){
				var facetNameValue = facet.split( ":" );
				if( facetNameValue.length >= 2 ){
					var facetName = facetNameValue[ 0 ];
					var facetValue = facetNameValue[ 1 ];
					if( facetName == "numDigits" ){
						numDigits = facetValue;
					}else if( facetName == "grouping" ){
						grouping = facetValue;
					}else if( facetName == "negativeOrder" ){
						negativeOrder = facetValue;
					}else if( facetName == "positiveOrder" ){
						positiveOrder = facetValue;
					}else if( facetName == "currencyLocale" ){
						currencyLocale = facetValue;
					}else if( facetName == "locale" ){
						locale = facetValue;
					}else if( facetName == "dateFormat" ){
						dateFormat = facetValue;
					}else if( facetName == "timeFormat" ){
						timeFormat = facetValue;
					}
				 }
			}
		}
	
		return InfoJet_DoFormat( element, type, numDigits, grouping, negativeOrder, positiveOrder, currencyLocale, locale, dateFormat, timeFormat );
	}
	return 0;
}

//CID 0102 //hgzhang //2008.08.26 //Begin
var InfoJet_LocaleIdArray = new Array( "1052", "1068", "2092", "1061", "1069", "1076", "1026", "3131", "1083", "2107", "1132", "1059", "1039", "1045", "5146", "1042", "1074", "1092", "1030", "3079", "1031", "5127", "4103", "2055", "1049", "1080", "2060", "1036", "3084", "5132", "3076", "6156", "4108", "1035", "1087", "2067", "1043", "1088", "1110", "1027", "1029", "1050", "4122", "1131", "2155", "3179", "1062", "1063", "4155", "5179", "1048", "1082", "1086", "2110", "1071", "1153", "1104", "1078", "6203", "7227", "1044", "4100", "2068", "1046", "2070", "1041", "1053", "2077", "2074", "3098", "6170", "7194", "8251", "1051", "1060", "1089", "1055", "1106", "1058", "1091", "2115", "11274", "15370", "6154", "20490", "16394", "1034", "7178", "12298", "9226", "5130", "3082", "2052", "18442", "10250", "2058", "19466", "17418", "4106", "8202", "14346", "13322", "1032", "1038", "9275", "2064", "1040", "1057", "6153", "3081", "10249", "13321", "9225", "4105", "12297", "1033", "7177", "11273", "5129", "8201", "2057", "5124", "1028", "1077", "15361", "3073", "13313", "14337", "1054" );
var InfoJet_CurrencySymbolArray = new Array( "Lek", "man.", "ман.", "kr", "€", "$", "лв", "$", "$", "$", "$", "р.", "kr.", "zł", "$", "₩", "$", "р.", "kr", "€", "€", "CHF", "€", "SFr.", "р.", "kr", "€", "€", "$", "€", "HK$", "€", "SFr.", "€", "Т", "€", "€", "сом", "€", "€", "Kč", "kn", "$", "$", "$", "$", "Ls", "Lt", "$", "$", "lei", "$", "R", "$", "ден.", "$", "₮", "R", "$", "$", "kr", "$", "kr", "R$ ", "€", "¥", "kr", "€", "Din.", "Дин.", "$", "$", "$", "Sk", "SIT", "S", "TL", "$", "грн.", "su'm", "сўм", "$", "Gs", "B/.", "$", "$b", "€", "RD$", "$", "$", "₡", "€", "￥", "L.", "S/.", "$", "C$", "$", "Q", "Bs", "$U", "$", "€", "Ft", "$", "SFr.", "€", "Rp", "€", "$", "BZ$", "Php", "$", "$", "Z$", "$", "R", "TT$", "$", "J$", "£", "P", "NT$", "$", "د.ب.", "ج.م.", "د.ك.", "د.إ.", "฿" );
var InfoJet_NumSeparatorTypeArray = new Array( "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "1", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "1", "1", "0", "0", "1", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1", "1" );
var InfoJet_CurSeparatorTypeArray = new Array( "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "1", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "1", "1", "0", "0", "1", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1", "1" );
//CID 0102 //hgzhang //2008.08.26 //End

function InfoJet_GetCurrencySybmol( localeId ){
	for( var i = 0; i < InfoJet_LocaleIdArray.length; i ++ ){
		if( InfoJet_LocaleIdArray[ i ] == localeId ){
			return InfoJet_CurrencySymbolArray[ i ];
		}
	}
	return "$";
}

function InfoJet_GetCurDecimalSeparator( localeId ){
	for( var i = 0; i < InfoJet_LocaleIdArray.length; i ++ ){
		if( InfoJet_LocaleIdArray[ i ] == localeId ){
			if( InfoJet_CurSeparatorTypeArray[ i ] == "1" ){
				return ".";
			}else{
				return ",";
			}
		}
	}
	return ".";
}

function InfoJet_GetCurSeparatorType( localeId ){
	for( var i = 0; i < InfoJet_LocaleIdArray.length; i ++ ){
		if( InfoJet_LocaleIdArray[ i ] == localeId ){
			return InfoJet_CurSeparatorTypeArray[ i ];
		}
	}
	return "1";
}

function InfoJet_GetNumSeparatorType(){
	var numSeparatorType = document.getElementById( "xdoc_data_num_separator_type" );
	return numSeparatorType.innerHTML;
}

function InfoJet_DoFormat( element, type, numDigits, grouping, negativeOrder, positiveOrder, currencyLocale, locale, dateFormat, timeFormat ){
	var value = element.value;
	//CID 0116 //hgzhang //2008.09.15 //Begin
	var schemaType = element.getAttribute( "schema_type" );
	//CID 0116 //hgzhang //2008.09.15 //End
	
	if( value.length <= 0 ){
		if( type == "boolean" || type == "string" || type == "anyURI" || type == "any" ){
			//Don't need xml_value.
			return 1;
		}
		if( type == "number" || type == "currency" || type == "percentage" ){
			element.setAttribute( "xml_value", "" );
			return 1;
		}
		//date/time type is handlered in the following codes.
	}
	
	if( type == "number" ){
		var formatedValue = "";
		var numberValue = ""
		var num = new NumberFormat();
		
		var numSeparatorType = InfoJet_GetNumSeparatorType();
		if( numSeparatorType == "1" ){
			num.setInputDecimal('.');
		}else{
			num.setInputDecimal(',');
		}
		num.setNumber(value);
		num.setCurrencyValue('$');
		num.setCurrency(false);
		num.setCurrencyPosition(num.LEFT_OUTSIDE);
		num.setNegativeRed(false);
		if( numDigits == "auto" ){
			num.setPlaces('-1', false);
		}else{
			if( numDigits == '0' ){
				num.setPlaces(numDigits, true);
			}else{
				num.setPlaces(numDigits, false);
			}
		}
		if( grouping == "0" ){
			num.setSeparators(false, ',', ',');
		}else{
			if( numSeparatorType == "1" ){
				num.setSeparators(true, ',', '.');	
			}else{
				num.setSeparators(true, '.', ',');	
			}
		}
		if( negativeOrder == "0" ){
			num.setNegativeFormat(num.PARENTHESIS);
		}else if( negativeOrder == "1" ){
			num.setNegativeFormat(num.LEFT_DASH);
		}else if( negativeOrder == "2" ){
			num.setNegativeFormat(num.LEFT_DASHSPACE);	
		}else if( negativeOrder == "3" ){
			num.setNegativeFormat(num.RIGHT_DASH);
		}else if( negativeOrder == "4" ){
			num.setNegativeFormat(num.RIGHT_DASHSPACE);
		}
		formatedValue = num.toFormatted();
		//CID 0116 //hgzhang //2008.09.15 //Comment
		/*
		if( numDigits == '0' ){
			numberValue = num.getOriginalInteger();
		}else{
			numberValue = num.getOriginal();
		}
		*/
		//CID 0116 //hgzhang //2008.09.15 //Comment
		//CID 0116 //hgzhang //2008.09.15 //Begin
		if( schemaType != null && schemaType.indexOf( "int" ) >= 0 ){
			numberValue = num.getOriginalInteger();
		}else{
			numberValue = num.getOriginal();
		}
		//CID 0116 //hgzhang //2008.09.15 //End
		
		//CID 0116 //hgzhang //2008.09.15 //Comment
		/*
		if( numDigits == '0' ){
			var numDecimalSeparator = ".";
			if( numSeparatorType == 1 ){
				numDecimalSeparator = ".";
			}else{
				numDecimalSeparator = ",";
			}
			if( value.indexOf( numDecimalSeparator ) >= 0 || isNaN( value ) ){
				element.setAttribute( "xml_value", value );
				return -1;
			}else{
				element.value = formatedValue;
				element.setAttribute( "xml_value", numberValue );
				return 1;
			}
		}else{
			element.value = formatedValue;
			element.setAttribute( "xml_value", numberValue );
			return 1;
		}
		*/
		//CID 0116 //hgzhang //2008.09.15 //Comment
		element.value = formatedValue;
		element.setAttribute( "xml_value", numberValue );
		return 1;
	}else if( type == "currency" ){
		var num = new NumberFormat();
		
		num.setInputDecimal( InfoJet_GetCurDecimalSeparator( currencyLocale ) );
		num.setNumber(value);
		num.setNegativeRed(false);
		if( numDigits == "auto" ){
			num.setPlaces('-1', false);
		}else{
			if( numDigits == '0' ){
				num.setPlaces(numDigits, true);
			}else{
				num.setPlaces(numDigits, false);
			}
		}
		if( grouping == "0" ){
			num.setSeparators(false, ',', ',');
		}else{
			if( InfoJet_GetCurSeparatorType( currencyLocale ) == "1" ){
				num.setSeparators(true, ',', '.');		
			}else{
				num.setSeparators(true, '.', ',');
			}
		}
		var currencySymbol = InfoJet_GetCurrencySybmol( currencyLocale );
		if( negativeOrder == "0" && positiveOrder == "0" ){
			num.setNegativeFormat(num.PARENTHESIS);
			num.setCurrencyPosition(num.LEFT_INSIDE);
		}else if( negativeOrder == "1" && positiveOrder == "0" ){
			num.setNegativeFormat(num.LEFT_DASH);
			num.setCurrencyPosition(num.LEFT_INSIDE);
		}else if( negativeOrder == "2" && positiveOrder == "0" ){
			num.setNegativeFormat(num.LEFT_DASH);
			num.setCurrencyPosition(num.LEFT_OUTSIDE);
		}else if( negativeOrder == "3" && positiveOrder == "0" ){
			num.setNegativeFormat(num.RIGHT_DASH);
			num.setCurrencyPosition(num.LEFT_INSIDE);
		}else if( negativeOrder == "4" && positiveOrder == "1" ){
			num.setNegativeFormat(num.PARENTHESIS);
			num.setCurrencyPosition(num.RIGHT_INSIDE);
		}else if( negativeOrder == "5" && positiveOrder == "1" ){
			num.setNegativeFormat(num.LEFT_DASH);
			num.setCurrencyPosition(num.RIGHT_INSIDE);
		}else if( negativeOrder == "6" && positiveOrder == "1" ){
			num.setNegativeFormat(num.RIGHT_DASH);
			num.setCurrencyPosition(num.RIGHT_OUTSIDE);
		}else if( negativeOrder == "7" && positiveOrder == "1" ){
			num.setNegativeFormat(num.RIGHT_DASH);
			num.setCurrencyPosition(num.RIGHT_INSIDE);
		}else if( negativeOrder == "8" && positiveOrder == "3" ){
			currencySymbol = " " + currencySymbol;
			num.setNegativeFormat(num.LEFT_DASH);
			num.setCurrencyPosition(num.RIGHT_INSIDE);
		}else if( negativeOrder == "9" && positiveOrder == "2" ){
			currencySymbol = currencySymbol + " ";
			num.setNegativeFormat(num.LEFT_DASH);
			num.setCurrencyPosition(num.LEFT_INSIDE);
		}else if( negativeOrder == "10" && positiveOrder == "3" ){
			currencySymbol = " " + currencySymbol;
			num.setNegativeFormat(num.RIGHT_DASH);
			num.setCurrencyPosition(num.RIGHT_INSIDE);
		}else if( negativeOrder == "11" && positiveOrder == "2" ){
			currencySymbol = currencySymbol + " ";
			num.setNegativeFormat(num.RIGHT_DASH);
			num.setCurrencyPosition(num.LEFT_INSIDE);
		}else if( negativeOrder == "12" && positiveOrder == "2" ){
			currencySymbol = currencySymbol + " ";
			num.setNegativeFormat(num.LEFT_DASH);
			num.setCurrencyPosition(num.LEFT_OUTSIDE);
		}else if( negativeOrder == "13" && positiveOrder == "3" ){
			currencySymbol = " " + currencySymbol;
			num.setNegativeFormat(num.RIGHT_DASH);
			num.setCurrencyPosition(num.RIGHT_OUTSIDE);
		}else if( negativeOrder == "14" && positiveOrder == "2" ){
			currencySymbol = currencySymbol + " ";
			num.setNegativeFormat(num.PARENTHESIS);
			num.setCurrencyPosition(num.LEFT_INSIDE);
		}else if( negativeOrder == "15" && positiveOrder == "3" ){
			currencySymbol = " " + currencySymbol;
			num.setNegativeFormat(num.PARENTHESIS);
			num.setCurrencyPosition(num.RIGHT_INSIDE);
		}
		num.setCurrencyValue(currencySymbol);
		num.setCurrency(true);
		formatedValue = num.toFormatted();
		//CID 0116 //hgzhang //2008.09.15 //Comment
		/*
		if( numDigits == '0' ){
			numberValue = num.getOriginalInteger();
		}else{
			numberValue = num.getOriginal();
		}
		*/
		//CID 0116 //hgzhang //2008.09.15 //Comment
		//CID 0116 //hgzhang //2008.09.15 //Begin
		if( schemaType != null && schemaType.indexOf( "int" ) >= 0 ){
			numberValue = num.getOriginalInteger();
		}else{
			numberValue = num.getOriginal();
		}
		//CID 0116 //hgzhang //2008.09.15 //End
		
		element.value = formatedValue;
		element.setAttribute( "xml_value", numberValue );
		return 1;
	}else if( type == "percentage" ){
		var formatedValue = "";
		var numberValue = ""
		var num = new NumberFormat();
		
		var numSeparatorType = InfoJet_GetNumSeparatorType();
		if( numSeparatorType == "1" ){
			num.setInputDecimal('.');
		}else{
			num.setInputDecimal(',');
		}
		num.setNumber(value);
		num.setCurrencyValue('$');
		num.setCurrency(false);
		num.setCurrencyPosition(num.LEFT_OUTSIDE);
		num.setNegativeRed(false);
		if( numDigits == "auto" ){
			num.setPlaces('-1', false);
		}else{
			num.setPlaces(numDigits, false);
		}
		if( grouping == "0" ){
			num.setSeparators(false, ',', ',');
		}else{
			if( numSeparatorType == "1" ){
				num.setSeparators(true, ',', '.');	
			}else{
				num.setSeparators(true, '.', ',');	
			}
		}
		if( negativeOrder == "0" ){
			num.setNegativeFormat(num.PARENTHESIS);
		}else if( negativeOrder == "1" ){
			num.setNegativeFormat(num.LEFT_DASH);
		}else if( negativeOrder == "2" ){
			num.setNegativeFormat(num.LEFT_DASHSPACE);	
		}else if( negativeOrder == "3" ){
			num.setNegativeFormat(num.RIGHT_DASH);
		}else if( negativeOrder == "4" ){
			num.setNegativeFormat(num.RIGHT_DASHSPACE);
		}
		formatedValue = num.toFormatted();
		numberValue = num.getOriginalPercentage();
		
		element.value = formatedValue;
		element.setAttribute( "xml_value", numberValue );
		return 1;
	}else if( type == "boolean" ){
		//Don't need xml_value.
//		if( value.toLowerCase() == "true" ){
//			element.value = "true";
//		}else{
//			element.value = "false";
//		}
		return 1;
	}else if( type == "string" ){
		//Don't need xml_value.
		return 1;
	}else if( type == "anyURI" ){
		//Don't need xml_value.
		return 1;
	}else if( type == "any" ){
		//Don't need xml_value.
		return 1;
	}else if( type == "date" ){
		if( dateFormat.length <= 0 ){
			return 0;
		}
		if( dateFormat == "Long Date" ){
			dateFormat = InfoJet_LongDatePattern;
		}
		if( dateFormat == "Year Month" ){
			dateFormat = InfoJet_YearMonthPattern;
		}
		if( dateFormat == "Short Date" ){
			dateFormat = InfoJet_ShortDatePattern;
		}
		if( dateFormat.indexOf( "dddd" ) >= 0 ){
			return 0;
		}
		if( dateFormat.indexOf( "MMMM" ) >= 0 ){
			return 0;
		}
		if( dateFormat.indexOf( "MMM" ) >= 0 ){
			return 0;
		}
		if( dateFormat.indexOf( "'" ) >= 0 ){
			return 0;
		}
		if( dateFormat.indexOf( "yyyy" ) < 0 && dateFormat.indexOf( "yy" ) >=0 ){
			return 0;
		}
		var date = Date.parseString( value, dateFormat );
		if( date == null ){
			date = Date.parseString( value, "yyyy-MM-dd" );
			if( date == null ){
				date = Date.parseString( value, "yyyy-M-d" );
				if( date == null ){
					if( value.length <= 0 ){
						element.setAttribute( "xml_value", "" );
						return 1;
					}else{
						element.setAttribute( "xml_value", value );
						return -1;
					}
				}
			}
		}
		element.value = date.format( dateFormat );
		element.setAttribute( "xml_value", date.format( "yyyy-MM-dd" ) );
		return 1;
	}else if( type == "time" ){
		//Don't need xml_value.
		return 0;
	}else if( type == "datetime" ){
		if( timeFormat == "none" ){
			if( dateFormat.length <= 0 ){
				return 0;
			}
			if( dateFormat == "Long Date" ){
				dateFormat = InfoJet_LongDatePattern;
			}
			if( dateFormat == "Year Month" ){
				dateFormat = InfoJet_YearMonthPattern;
			}
			if( dateFormat == "Short Date" ){
				dateFormat = InfoJet_ShortDatePattern;
			}
			if( dateFormat.indexOf( "dddd" ) >= 0 ){
				return 0;
			}
			if( dateFormat.indexOf( "MMMM" ) >= 0 ){
				return 0;
			}
			if( dateFormat.indexOf( "'" ) >= 0 ){
				return 0;
			}
			var date = Date.parseString( value, dateFormat );
			if( date == null ){
				date = Date.parseString( value, "yyyy-MM-dd" );
				if( date == null ){
					date = Date.parseString( value, "yyyy-M-d" );
					if( date == null ){
						if( value.length <= 0 ){
							element.setAttribute( "xml_value", "" );
							return 1;
						}else{
							element.setAttribute( "xml_value", value );
							return -1;
						}
					}
				}
			}
			element.value = date.format( dateFormat );
			element.setAttribute( "xml_value", date.format( "yyyy-MM-dd" ) + "T00:00:00" );
			return 1;
		}
		return 0;
	}else if( type == "unknown" ){
		//Don't need xml_value.
		return 0;
	}
	//Don't need xml_value.
	return 0;
}

//-------------------------------------------------
// NumberFormat154.js
//-------------------------------------------------
// mredkj.com
function NumberFormat(num, inputDecimal)
{
this.VERSION = 'Number Format v1.5.4';
this.COMMA = ',';
this.PERIOD = '.';
this.DASH = '-'; 
this.LEFT_PAREN = '('; 
this.RIGHT_PAREN = ')'; 
this.LEFT_OUTSIDE = 0; 
this.LEFT_INSIDE = 1;  
this.RIGHT_INSIDE = 2;  
this.RIGHT_OUTSIDE = 3;  
this.LEFT_DASH = 0; 
this.RIGHT_DASH = 1; 
this.PARENTHESIS = 2; 
this.LEFT_DASHSPACE = 3;
this.RIGHT_DASHSPACE = 4;
this.NO_ROUNDING = -1 
this.num;
this.hasSeparators = false;  
this.separatorValue;  
this.inputDecimalValue; 
this.decimalValue;  
this.negativeFormat; 
this.negativeRed; 
this.hasCurrency;  
this.currencyPosition;  
this.currencyValue;  
this.places;
this.roundToPlaces; 
this.truncate; 
this.setNumber = setNumberNF;
this.toUnformatted = toUnformattedNF;
this.setInputDecimal = setInputDecimalNF; 
this.setSeparators = setSeparatorsNF; 
this.setCommas = setCommasNF;
this.setNegativeFormat = setNegativeFormatNF; 
this.setNegativeRed = setNegativeRedNF; 
this.setCurrency = setCurrencyNF;
this.setCurrencyPrefix = setCurrencyPrefixNF;
this.setCurrencyValue = setCurrencyValueNF; 
this.setCurrencyPosition = setCurrencyPositionNF; 
this.setPlaces = setPlacesNF;
this.toFormatted = toFormattedNF;
this.toPercentage = toPercentageNF;
this.getOriginal = getOriginalNF;
this.getOriginalPercentage = getOriginalPercentageNF;
this.getOriginalInteger = getOriginalIntegerNF;
this.moveDecimalRight = moveDecimalRightNF;
this.moveDecimalLeft = moveDecimalLeftNF;
this.getRounded = getRoundedNF;
this.preserveZeros = preserveZerosNF;
this.justNumber = justNumberNF;
this.expandExponential = expandExponentialNF;
this.getZeros = getZerosNF;
this.moveDecimalAsString = moveDecimalAsStringNF;
this.moveDecimal = moveDecimalNF;
this.addSeparators = addSeparatorsNF;
if (inputDecimal == null) {
this.setNumber(num, this.PERIOD);
} else {
this.setNumber(num, inputDecimal); 
}
this.setCommas(true);
this.setNegativeFormat(this.LEFT_DASH); 
this.setNegativeRed(false); 
this.setCurrency(false); 
this.setCurrencyPrefix('$');
this.setPlaces(2);
}
function setInputDecimalNF(val)
{
this.inputDecimalValue = val;
}
function setNumberNF(num, inputDecimal)
{
if (inputDecimal != null) {
this.setInputDecimal(inputDecimal); 
}
this.num = this.justNumber(num);
}
function toUnformattedNF()
{
return (this.num);
}
function getOriginalNF()
{
return (this.num);
}
function getOriginalPercentageNF()
{
return (parseFloat( this.moveDecimalLeft(this.num + '', 2) ));
}
function getOriginalIntegerNF()
{
return (parseInt( this.num ));
}
function setNegativeFormatNF(format)
{
this.negativeFormat = format;
}
function setNegativeRedNF(isRed)
{
this.negativeRed = isRed;
}
function setSeparatorsNF(isC, separator, decimal)
{
this.hasSeparators = isC;
if (separator == null) separator = this.COMMA;
if (decimal == null) decimal = this.PERIOD;
if (separator == decimal) {
this.decimalValue = (decimal == this.PERIOD) ? this.COMMA : this.PERIOD;
} else {
this.decimalValue = decimal;
}
this.separatorValue = separator;
}
function setCommasNF(isC)
{
this.setSeparators(isC, this.COMMA, this.PERIOD);
}
function setCurrencyNF(isC)
{
this.hasCurrency = isC;
}
function setCurrencyValueNF(val)
{
this.currencyValue = val;
}
function setCurrencyPrefixNF(cp)
{
this.setCurrencyValue(cp);
this.setCurrencyPosition(this.LEFT_OUTSIDE);
}
function setCurrencyPositionNF(cp)
{
this.currencyPosition = cp
}
function setPlacesNF(p, tr)
{
this.roundToPlaces = !(p == this.NO_ROUNDING); 
this.truncate = (tr != null && tr); 
this.places = (p < 0) ? 0 : p; 
}
function addSeparatorsNF(nStr, inD, outD, sep)
{
nStr += '';
var dpos = nStr.indexOf(inD);
var nStrEnd = '';
if (dpos != -1) {
nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
nStr = nStr.substring(0, dpos);
}
//CID 0048 & CID 6907 // IM // 25-7-2008 //if
if (!InfoJet_EnableReplaceGroupingSymbol) {
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(nStr)) {
		nStr = nStr.replace(rgx, '$1' + sep + '$2');
	}
}
return nStr + nStrEnd;
}
function toFormattedNF()
{	
var pos;
var nNum = this.num; 
var nStr;            
var splitString = new Array(2);   
if (this.roundToPlaces) {
nNum = this.getRounded(nNum);
nStr = this.preserveZeros(Math.abs(nNum)); 
} else {
nStr = this.expandExponential(Math.abs(nNum)); 
}
if (this.hasSeparators) {
nStr = this.addSeparators(nStr, this.PERIOD, this.decimalValue, this.separatorValue);
} else {
nStr = nStr.replace(new RegExp('\\' + this.PERIOD), this.decimalValue); 
}
var c0 = '';
var n0 = '';
var c1 = '';
var n1 = '';
var n2 = '';
var c2 = '';
var n3 = '';
var c3 = '';
var negSignL = (this.negativeFormat == this.PARENTHESIS) ? this.LEFT_PAREN : this.DASH;
var negSignR = (this.negativeFormat == this.PARENTHESIS) ? this.RIGHT_PAREN : this.DASH;
if (this.currencyPosition == this.LEFT_OUTSIDE) {
if (nNum < 0) {
if (this.negativeFormat == this.LEFT_DASH || this.negativeFormat == this.PARENTHESIS) n1 = negSignL;
if (this.negativeFormat == this.RIGHT_DASH || this.negativeFormat == this.PARENTHESIS) n2 = negSignR;
if (this.negativeFormat == this.LEFT_DASHSPACE ){ n1 = "- "; }
if (this.negativeFormat == this.RIGHT_DASHSPACE ){ n2 = " -"; }
}
if (this.hasCurrency) c0 = this.currencyValue;
} else if (this.currencyPosition == this.LEFT_INSIDE) {
if (nNum < 0) {
if (this.negativeFormat == this.LEFT_DASH || this.negativeFormat == this.PARENTHESIS) n0 = negSignL;
if (this.negativeFormat == this.RIGHT_DASH || this.negativeFormat == this.PARENTHESIS) n3 = negSignR;
}
if (this.hasCurrency) c1 = this.currencyValue;
}
else if (this.currencyPosition == this.RIGHT_INSIDE) {
if (nNum < 0) {
if (this.negativeFormat == this.LEFT_DASH || this.negativeFormat == this.PARENTHESIS) n0 = negSignL;
if (this.negativeFormat == this.RIGHT_DASH || this.negativeFormat == this.PARENTHESIS) n3 = negSignR;
}
if (this.hasCurrency) c2 = this.currencyValue;
}
else if (this.currencyPosition == this.RIGHT_OUTSIDE) {
if (nNum < 0) {
if (this.negativeFormat == this.LEFT_DASH || this.negativeFormat == this.PARENTHESIS) n1 = negSignL;
if (this.negativeFormat == this.RIGHT_DASH || this.negativeFormat == this.PARENTHESIS) n2 = negSignR;
}
if (this.hasCurrency) c3 = this.currencyValue;
}
nStr = c0 + n0 + c1 + n1 + nStr + n2 + c2 + n3 + c3;
if (this.negativeRed && nNum < 0) {
nStr = '<font color="red">' + nStr + '</font>';
}
return (nStr);
}
function toPercentageNF()
{
nNum = this.num * 100;
nNum = this.getRounded(nNum);
return nNum + '%';
}
function getZerosNF(places)
{
var extraZ = '';
var i;
for (i=0; i<places; i++) {
extraZ += '0';
}
return extraZ;
}
function expandExponentialNF(origVal)
{
if (isNaN(origVal)) return origVal;
var newVal = parseFloat(origVal) + ''; 
var eLoc = newVal.toLowerCase().indexOf('e');
if (eLoc != -1) {
var plusLoc = newVal.toLowerCase().indexOf('+');
var negLoc = newVal.toLowerCase().indexOf('-', eLoc); 
var justNumber = newVal.substring(0, eLoc);
if (negLoc != -1) {
var places = newVal.substring(negLoc + 1, newVal.length);
justNumber = this.moveDecimalAsString(justNumber, true, parseInt(places));
} else {
if (plusLoc == -1) plusLoc = eLoc;
var places = newVal.substring(plusLoc + 1, newVal.length);
justNumber = this.moveDecimalAsString(justNumber, false, parseInt(places));
}
newVal = justNumber;
}
return newVal;
} 
function moveDecimalRightNF(val, places)
{
var newVal = '';
if (places == null) {
newVal = this.moveDecimal(val, false);
} else {
newVal = this.moveDecimal(val, false, places);
}
return newVal;
}
function moveDecimalLeftNF(val, places)
{
var newVal = '';
if (places == null) {
newVal = this.moveDecimal(val, true);
} else {
newVal = this.moveDecimal(val, true, places);
}
return newVal;
}
function moveDecimalAsStringNF(val, left, places)
{
var spaces = (arguments.length < 3) ? this.places : places;
if (spaces <= 0) return val; 
var newVal = val + '';
var extraZ = this.getZeros(spaces);
var re1 = new RegExp('([0-9.]+)');
if (left) {
newVal = newVal.replace(re1, extraZ + '$1');
var re2 = new RegExp('(-?)([0-9]*)([0-9]{' + spaces + '})(\\.?)');		
newVal = newVal.replace(re2, '$1$2.$3');
} else {
var reArray = re1.exec(newVal); 
if (reArray != null) {
newVal = newVal.substring(0,reArray.index) + reArray[1] + extraZ + newVal.substring(reArray.index + reArray[0].length); 
}
var re2 = new RegExp('(-?)([0-9]*)(\\.?)([0-9]{' + spaces + '})');
newVal = newVal.replace(re2, '$1$2$4.');
}
newVal = newVal.replace(/\.$/, ''); 
return newVal;
}
function moveDecimalNF(val, left, places)
{
var newVal = '';
if (places == null) {
newVal = this.moveDecimalAsString(val, left);
} else {
newVal = this.moveDecimalAsString(val, left, places);
}
return parseFloat(newVal);
}
function getRoundedNF(val)
{
val = this.moveDecimalRight(val);
if (this.truncate) {
val = val >= 0 ? Math.floor(val) : Math.ceil(val); 
} else {
val = Math.round(val);
}
val = this.moveDecimalLeft(val);
return val;
}
function preserveZerosNF(val)
{
var i;
val = this.expandExponential(val);
if (this.places <= 0) return val; 
var decimalPos = val.indexOf('.');
if (decimalPos == -1) {
val += '.';
for (i=0; i<this.places; i++) {
val += '0';
}
} else {
var actualDecimals = (val.length - 1) - decimalPos;
var difference = this.places - actualDecimals;
for (i=0; i<difference; i++) {
val += '0';
}
}
return val;
}
function justNumberNF(val)
{
newVal = val + '';
var isPercentage = false;
if (newVal.indexOf('%') != -1) {
newVal = newVal.replace(/\%/g, '');
isPercentage = true; 
}
var re = new RegExp('[^\\' + this.inputDecimalValue + '\\d\\-\\+\\(\\)eE]', 'g');	
newVal = newVal.replace(re, '');
var tempRe = new RegExp('[' + this.inputDecimalValue + ']', 'g');
var treArray = tempRe.exec(newVal); 
if (treArray != null) {
var tempRight = newVal.substring(treArray.index + treArray[0].length); 
newVal = newVal.substring(0,treArray.index) + this.PERIOD + tempRight.replace(tempRe, ''); 
}
if (newVal.charAt(newVal.length - 1) == this.DASH ) {
newVal = newVal.substring(0, newVal.length - 1);
newVal = '-' + newVal;
}
else if (newVal.charAt(0) == this.LEFT_PAREN
&& newVal.charAt(newVal.length - 1) == this.RIGHT_PAREN) {
newVal = newVal.substring(1, newVal.length - 1);
newVal = '-' + newVal;
}
newVal = parseFloat(newVal);
if (!isFinite(newVal)) {
newVal = 0;
}
if (isPercentage) {
newVal = this.moveDecimalLeft(newVal, 2);
}
return newVal;
}

/*===================================================================
 Author: Matt Kruse
 
 View documentation, examples, and source code at:
     http://www.JavascriptToolbox.com/

 NOTICE: You may use this code for any purpose, commercial or
 private, without any further permission from the author. You may
 remove this notice from your final code if you wish, however it is
 appreciated by the author if at least the web site address is kept.

 This code may NOT be distributed for download from script sites, 
 open source CDs or sites, or any other distribution method. If you
 wish you share this code with others, please direct them to the 
 web site above.
 
 Pleae do not link directly to the .js files on the server above. Copy
 the files to your own server for use with your site or webapp.
 ===================================================================*/
/*
Date functions

These functions are used to parse, format, and manipulate Date objects.
See documentation and examples at http://www.JavascriptToolbox.com/lib/date/

*/
Date.$VERSION = 1.02;

// Utility function to append a 0 to single-digit numbers
Date.LZ = function(x) {return(x<0||x>9?"":"0")+x};
// Full month names. Change this for local month names
Date.monthNames = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
// Month abbreviations. Change this for local month names
Date.monthAbbreviations = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
// Full day names. Change this for local month names
Date.dayNames = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
// Day abbreviations. Change this for local month names
Date.dayAbbreviations = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
// Used for parsing ambiguous dates like 1/2/2000 - default to preferring 'American' format meaning Jan 2.
// Set to false to prefer 'European' format meaning Feb 1
Date.preferAmericanFormat = true;

// If the getFullYear() method is not defined, create it
if (!Date.prototype.getFullYear) { 
	Date.prototype.getFullYear = function() { var yy=this.getYear(); return (yy<1900?yy+1900:yy); } 
} 

// Parse a string and convert it to a Date object.
// If no format is passed, try a list of common formats.
// If string cannot be parsed, return null.
// Avoids regular expressions to be more portable.
Date.parseString = function(val, format) {
	// If no format is specified, try a few common formats
	if (typeof(format)=="undefined" || format==null || format=="") {
		var generalFormats=new Array('y-M-d','MMM d, y','MMM d,y','y-MMM-d','d-MMM-y','MMM d','MMM-d','d-MMM');
		var monthFirst=new Array('M/d/y','M-d-y','M.d.y','M/d','M-d');
		var dateFirst =new Array('d/M/y','d-M-y','d.M.y','d/M','d-M');
		var checkList=new Array(generalFormats,Date.preferAmericanFormat?monthFirst:dateFirst,Date.preferAmericanFormat?dateFirst:monthFirst);
		for (var i=0; i<checkList.length; i++) {
			var l=checkList[i];
			for (var j=0; j<l.length; j++) {
				var d=Date.parseString(val,l[j]);
				if (d!=null) { 
					return d; 
				}
			}
		}
		return null;
	}

	this.isInteger = function(val) {
		for (var i=0; i < val.length; i++) {
			if ("1234567890".indexOf(val.charAt(i))==-1) { 
				return false; 
			}
		}
		return true;
	};
	this.getInt = function(str,i,minlength,maxlength) {
		for (var x=maxlength; x>=minlength; x--) {
			var token=str.substring(i,i+x);
			if (token.length < minlength) { 
				return null; 
			}
			if (this.isInteger(token)) { 
				return token; 
			}
		}
	return null;
	};
	val=val+"";
	format=format+"";
	var i_val=0;
	var i_format=0;
	var c="";
	var token="";
	var token2="";
	var x,y;
	var year=new Date().getFullYear();
	var month=1;
	var date=1;
	var hh=0;
	var mm=0;
	var ss=0;
	var ampm="";
	while (i_format < format.length) {
		// Get next token from format string
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
		}
		// Extract contents of value based on format token
		if (token=="yyyy" || token=="yy" || token=="y") {
			if (token=="yyyy") { 
				x=4;y=4; 
			}
			if (token=="yy") { 
				x=2;y=2; 
			}
			if (token=="y") { 
				x=2;y=4; 
			}
			year=this.getInt(val,i_val,x,y);
			if (year==null) { 
				return null; 
			}
			i_val += year.length;
			if (year.length==2) {
				if (year > 70) { 
					year=1900+(year-0); 
				}
				else { 
					year=2000+(year-0); 
				}
			}
		}
		else if (token=="MMM" || token=="NNN"){
			month=0;
			var names = (token=="MMM"?(Date.monthNames.concat(Date.monthAbbreviations)):Date.monthAbbreviations);
			for (var i=0; i<names.length; i++) {
				var month_name=names[i];
				if (val.substring(i_val,i_val+month_name.length).toLowerCase()==month_name.toLowerCase()) {
					month=(i%12)+1;
					i_val += month_name.length;
					break;
				}
			}
			if ((month < 1)||(month>12)){
				return null;
			}
		}
		else if (token=="EE"||token=="E"){
			var names = (token=="EE"?Date.dayNames:Date.dayAbbreviations);
			for (var i=0; i<names.length; i++) {
				var day_name=names[i];
				if (val.substring(i_val,i_val+day_name.length).toLowerCase()==day_name.toLowerCase()) {
					i_val += day_name.length;
					break;
				}
			}
		}
		else if (token=="MM"||token=="M") {
			month=this.getInt(val,i_val,token.length,2);
			if(month==null||(month<1)||(month>12)){
				return null;
			}
			i_val+=month.length;
		}
		else if (token=="dd"||token=="d") {
			date=this.getInt(val,i_val,token.length,2);
			if(date==null||(date<1)||(date>31)){
				return null;
			}
			i_val+=date.length;
		}
		else if (token=="hh"||token=="h") {
			hh=this.getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>12)){
				return null;
			}
			i_val+=hh.length;
		}
		else if (token=="HH"||token=="H") {
			hh=this.getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>23)){
				return null;
			}
			i_val+=hh.length;
		}
		else if (token=="KK"||token=="K") {
			hh=this.getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>11)){
				return null;
			}
			i_val+=hh.length;
			hh++;
		}
		else if (token=="kk"||token=="k") {
			hh=this.getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>24)){
				return null;
			}
			i_val+=hh.length;
			hh--;
		}
		else if (token=="mm"||token=="m") {
			mm=this.getInt(val,i_val,token.length,2);
			if(mm==null||(mm<0)||(mm>59)){
				return null;
			}
			i_val+=mm.length;
		}
		else if (token=="ss"||token=="s") {
			ss=this.getInt(val,i_val,token.length,2);
			if(ss==null||(ss<0)||(ss>59)){
				return null;
			}
			i_val+=ss.length;
		}
		else if (token=="a") {
			if (val.substring(i_val,i_val+2).toLowerCase()=="am") {
				ampm="AM";
			}
			else if (val.substring(i_val,i_val+2).toLowerCase()=="pm") {
				ampm="PM";
			}
			else {
				return null;
			}
			i_val+=2;
		}
		else {
			if (val.substring(i_val,i_val+token.length)!=token) {
				return null;
			}
			else {
				i_val+=token.length;
			}
		}
	}
	// If there are any trailing characters left in the value, it doesn't match
	if (i_val != val.length) { 
		return null; 
	}
	// Is date valid for month?
	if (month==2) {
		// Check for leap year
		if ( ( (year%4==0)&&(year%100 != 0) ) || (year%400==0) ) { // leap year
			if (date > 29){ 
				return null; 
			}
		}
		else { 
			if (date > 28) { 
				return null; 
			} 
		}
	}
	if ((month==4)||(month==6)||(month==9)||(month==11)) {
		if (date > 30) { 
			return null; 
		}
	}
	// Correct hours value
	if (hh<12 && ampm=="PM") {
		hh=hh-0+12; 
	}
	else if (hh>11 && ampm=="AM") { 
		hh-=12; 
	}
	return new Date(year,month-1,date,hh,mm,ss);
}

// Check if a date string is valid
Date.isValid = function(val,format) {
	return (Date.parseString(val,format) != null);
}

// Check if a date object is before another date object
Date.prototype.isBefore = function(date2) {
	if (date2==null) { 
		return false; 
	}
	return (this.getTime()<date2.getTime());
}

// Check if a date object is after another date object
Date.prototype.isAfter = function(date2) {
	if (date2==null) { 
		return false; 
	}
	return (this.getTime()>date2.getTime());
}

// Check if two date objects have equal dates and times
Date.prototype.equals = function(date2) {
	if (date2==null) { 
		return false; 
	}
	return (this.getTime()==date2.getTime());
}

// Check if two date objects have equal dates, disregarding times
Date.prototype.equalsIgnoreTime = function(date2) {
	if (date2==null) { 
		return false; 
	}
	var d1 = new Date(this.getTime()).clearTime();
	var d2 = new Date(date2.getTime()).clearTime();
	return (d1.getTime()==d2.getTime());
}

// Format a date into a string using a given format string
Date.prototype.format = function(format) {
	format=format+"";
	var result="";
	var i_format=0;
	var c="";
	var token="";
	var y=this.getYear()+"";
	var M=this.getMonth()+1;
	var d=this.getDate();
	var E=this.getDay();
	var H=this.getHours();
	var m=this.getMinutes();
	var s=this.getSeconds();
	var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
	// Convert real date parts into formatted versions
	var value=new Object();
	if (y.length < 4) {
		y=""+(+y+1900);
	}
	value["y"]=""+y;
	value["yyyy"]=y;
	value["yy"]=y.substring(2,4);
	value["M"]=M;
	value["MM"]=Date.LZ(M);
	value["MMM"]=Date.monthNames[M-1];
	value["NNN"]=Date.monthAbbreviations[M-1];
	value["d"]=d;
	value["dd"]=Date.LZ(d);
	value["E"]=Date.dayAbbreviations[E];
	value["EE"]=Date.dayNames[E];
	value["H"]=H;
	value["HH"]=Date.LZ(H);
	if (H==0){
		value["h"]=12;
	}
	else if (H>12){
		value["h"]=H-12;
	}
	else {
		value["h"]=H;
	}
	value["hh"]=Date.LZ(value["h"]);
	value["K"]=value["h"]-1;
	value["k"]=value["H"]+1;
	value["KK"]=Date.LZ(value["K"]);
	value["kk"]=Date.LZ(value["k"]);
	if (H > 11) { 
		value["a"]="PM"; 
	}
	else { 
		value["a"]="AM"; 
	}
	value["m"]=m;
	value["mm"]=Date.LZ(m);
	value["s"]=s;
	value["ss"]=Date.LZ(s);
	while (i_format < format.length) {
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
		}
		if (typeof(value[token])!="undefined") { 
			result=result + value[token]; 
		}
		else { 
			result=result + token; 
		}
	}
	return result;
}

// Get the full name of the day for a date
Date.prototype.getDayName = function() { 
	return Date.dayNames[this.getDay()];
}

// Get the abbreviation of the day for a date
Date.prototype.getDayAbbreviation = function() { 
	return Date.dayAbbreviations[this.getDay()];
}

// Get the full name of the month for a date
Date.prototype.getMonthName = function() {
	return Date.monthNames[this.getMonth()];
}

// Get the abbreviation of the month for a date
Date.prototype.getMonthAbbreviation = function() { 
	return Date.monthAbbreviations[this.getMonth()];
}

// Clear all time information in a date object
Date.prototype.clearTime = function() {
  this.setHours(0); 
  this.setMinutes(0);
  this.setSeconds(0); 
  this.setMilliseconds(0);
  return this;
}

// Add an amount of time to a date. Negative numbers can be passed to subtract time.
Date.prototype.add = function(interval, number) {
	if (typeof(interval)=="undefined" || interval==null || typeof(number)=="undefined" || number==null) { 
		return this; 
	}
	number = +number;
	if (interval=='y') { // year
		this.setFullYear(this.getFullYear()+number);
	}
	else if (interval=='M') { // Month
		this.setMonth(this.getMonth()+number);
	}
	else if (interval=='d') { // Day
		this.setDate(this.getDate()+number);
	}
	else if (interval=='w') { // Weekday
		var step = (number>0)?1:-1;
		while (number!=0) {
			this.add('d',step);
			while(this.getDay()==0 || this.getDay()==6) { 
				this.add('d',step);
			}
			number -= step;
		}
	}
	else if (interval=='h') { // Hour
		this.setHours(this.getHours() + number);
	}
	else if (interval=='m') { // Minute
		this.setMinutes(this.getMinutes() + number);
	}
	else if (interval=='s') { // Second
		this.setSeconds(this.getSeconds() + number);
	}
	return this;
}

//====================================================================

//FireFox Compatiable Support
//CID 0017 //hgzhang //2008.06.16 //Begin
function InfoJet_InsertAdjacentHTMLBeforeEnd( targetNode, html ){
	if( InfoJet_IsIE() ){
		targetNode.insertAdjacentHTML( "BeforeEnd", html );
	}else{
		var range = document.createRange();
		//range.setStartBefore( targetNode );
		var parsedNode = range.createContextualFragment( html );
		targetNode.appendChild( parsedNode );
	}
}
//CID 0017 //hgzhang //2008.06.14 //End

//CID 0020 //hgzhang //2008.06.20 //Begin
function InfoJet_RemoveHtmlElement( element ){
	if( InfoJet_IsIE() ){
		element.outerHTML = "";
	}else{
		element.parentNode.removeChild( element );
	}
}
//CID 0020 //hgzhang //2008.06.20 //End



//创建一个DOM Div对象
function getANewDiv(width,height,className)
{ 
    var div=document.createElement("DIV");
    if(className)div.className=className;
    if(width!=undefined &&width>0)
        div.style.width=width+"px";
    if(height!=undefined && height>0)
        div.style.height=height+"px";
    return div;

}

function treateKingEditor()
{
    if(!window.KindEditorTreated && KindEditor)
   {
        var arr=KindEditor.options.items;        
        var full=arr[arr.length-30]; 
        arr.splice(arr.length-32,4);   
        arr.splice(arr.length-14,4);
        arr.splice(arr.length-1,1);        
        arr.unshift(full);               
        for(var i=arr.length-1;i>=0;i--)
        if(arr[i]=="|")arr.splice(i,1);  
        arr.splice(4,4);   
         arr.splice(1,1);       
        window.KindEditorTreated=true;
   }
}

function uploadClipBoard()
{return;
try{
if(!window.localResourceManager)
{
  window.localResourceManager=new ActiveXObject("KingdeePLMCommon.LocalResourceManager");      
}
    var message=window.localResourceManager.GetClipboardImage();
    if(message.indexOf("ERR:")==0)
    {
        alert(message.substring(4));
        return;
    }
    var files=[];
    if(message.indexOf("|")>0)
        files=message.split(/|/ig);
    else
        files.push(message);
        var adoStream = new ActiveXObject('ADODB.Stream'); 
     var hasError=false;
      if (adoStream.State != 1) {
            adoStream.Type = 1;
            adoStream.Open();
            }
    for(var i=0;i<files.length;i++)    
    {
    
    try{
         adoStream.LoadFromFile(filepath);
        adoStream.Position = 0;
        var data = adoStream.Read(); //adoStream.Read(-1); // -1=adReadAll
        alert(data);
        }catch(e){            
            hasError=true;            
        }        
    }
    adoStream.Close();
    return files[0];
}catch(e)
{
alert(e.message);
    return;
}
    
 }


//RichtextBox转换
function tranferControl(ctl)
{

  var width=parseInt(ctl.style.width,10);
  var height=parseInt(ctl.style.height,10);
   var box=getANewDiv(width,height,"editorBox");     
   box.style.width=ctl.style.width;
   box.style.height=ctl.style.height;
   box.style.overflowX=ctl.style.overflowX;
   box.style.overflowY=ctl.style.overflowY;
    box.innerHTML=ctl.value;
    box.contentEditable=true;     
   box.relationCtl=ctl;
   ctl.relationCtl=box;  
   ctl.parentNode.insertBefore(box,ctl);
    box.style.fontSize=ctl.currentStyle.fontSize;
   box.style.color=ctl.currentStyle.color;
   box.style.fontFamily=ctl.currentStyle.fontFamily;
    treateKingEditor();
   //box.ondblclick=function()
   //{
    if (!box.isCreatedCtl)
        {
        box.relationCtl.value = box.innerHTML;
        box.relationCtl.onchange();
        box.style.display = "none";
        var ed = KindEditor.create(box.relationCtl, {
            allowFileManager:
                false, uploadJson: '../Common/upload_json.ashx', minWidth: 20, allowFileManager: false, minHeight: 150
        });
	        box.relationCtl.editor = ed;
//	        this.nextSibling.childNodes[0].childNodes[37].title="上传剪贴板内容";
//	        this.nextSibling.childNodes[0].childNodes[37].onclick=function(){
//	        var fnames=uploadClipBoard();
//	           if(!fnames)
//	           {	          
//	           event.cancelBubble=true;
//	           return;	           
//	           }
//	        this.previousSibling.click();
//	        event.cancelBubble=true;
//	        var frm=null;
//	        for(var i=0;i<document.body.childNodes.length;i++)
//	        {
//	          if(document.body.childNodes[i].className=="ke-dialog-default ke-dialog")
//	          frm=document.body.childNodes[i];
//	        }
//	        if(frm!=null)
//	        {	       
//	           var p=frm.childNodes[0].childNodes[1].childNodes[0];
//	           p.childNodes[0].childNodes[0].childNodes[0].click();
//	           inputs=p.childNodes[1].getElementsByTagName("input");         
//	           
//	           inputs[0].value=fnames;
//	          p.childNodes[1].getElementsByTagName("img")[0].click();
//	          setTimeout(function(){p.parentNode.nextSibling.getElementsByTagName("input")[0].click();},50);
//	        }
//	        }
	        
	    }
    box.isCreatedCtl = true;
   //}   
     if(ctl.offsetHeight>24)
     {
     box.style.overflow="scroll";
     }
 }
var richtextBoxCtls=[];
//初始化RichtextBox
function initialRichTextBox() {
    var textareas = document.getElementsByTagName("textarea");
    richtextBoxCtls.splice(0, richtextBoxCtls.length);
    var isPreview = window.location.href.indexOf("printpriew=1") > 0;
    for (var i = textareas.length - 1; i >= 0; i--) {
        if (textareas[i].style.display == "none") continue;
        var attr = textareas[i].attributes["xd:xctname"];
        if (attr.value && attr.value.toLowerCase() == "richtext") {
            if (window.extendGlobal || textareas[i].title.indexOf("[图文编辑]") >= 0) {
                if (isPreview) {
                    var newdiv = document.createElement("div");
                    newdiv.innerHTML = textareas[i].value;
                    newdiv.style.width = "100%";
                    newdiv.style.height = "100%";
                    textareas[i].parentNode.insertBefore(newdiv, textareas[i]);
                    textareas[i].parentNode.removeChild(textareas[i]);
                    continue;
                }

                textareas[i].className = "xdRichTextBoxHidden";
                richtextBoxCtls.push(textareas[i]);
                tranferControl(textareas[i]);
            } else {
                var v = textareas[i].value;
                var m = /[<][^<]+[>][^<]+[<][/][^>]+[>]/ig;
                if (m.test(v)) {
                    var vdom = document.createElement("div");
                    vdom.innerHTML = v;
                    textareas[i].value = vdom.innerText;
                }
            }

        }
    }
}

function setReadOnly(ctl)
{
 if(!ctl.relationCtl)return;
 var box=ctl.relationCtl;
 box.ondblclick=null;
 box.style.display="none";
 box.contentEditable=false;
 var aAll = box.getElementsByTagName("a");

 var editor = ctl.relationCtl.editor ||
             (ctl.relationCtl.relationCtl && ctl.relationCtl.relationCtl.editor);
 if (editor) {
     editor.readonly(true);
 }

 if(aAll.length>0 && aAll[0].name=="autosize")
 {
 box.style.border="none";
 }
  box.style.overflow="auto";

 box.style.height="auto"; 
}
