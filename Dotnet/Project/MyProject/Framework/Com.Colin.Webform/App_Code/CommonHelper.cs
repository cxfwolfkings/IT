using NVelocity;
using NVelocity.App;
using NVelocity.Runtime;

public static class CommonHelper
{
    /// <summary>
    /// 用data数据填充templateName模板，渲染生成html返回
    /// </summary>
    /// <param name="templateName"></param>
    /// <param name="data"></param>
    /// <returns></returns>
    public static string RenderHtml(string templateName, object data, string fieldName)
    {
        VelocityEngine vltEngine = new VelocityEngine();
        vltEngine.SetProperty(RuntimeConstants.RESOURCE_LOADER, "file");
        // 模板文件所在的文件夹
        vltEngine.SetProperty(RuntimeConstants.FILE_RESOURCE_LOADER_PATH, System.Web.Hosting.HostingEnvironment.MapPath("~/Templates"));
        vltEngine.Init();

        VelocityContext vltContext = new VelocityContext();
        // 设置参数，在模板中可以通过$data来引用
        vltContext.Put(fieldName, data);

        Template vltTemplate = vltEngine.GetTemplate(templateName);
        System.IO.StringWriter vltWriter = new System.IO.StringWriter();
        vltTemplate.Merge(vltContext, vltWriter);

        string html = vltWriter.GetStringBuilder().ToString();
        return html;
    }
}