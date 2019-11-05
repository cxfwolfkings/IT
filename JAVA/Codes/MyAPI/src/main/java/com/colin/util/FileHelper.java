package com.colin.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.PrintWriter;

public class FileHelper {
	
	/**
	 * 创建文件
	 * @param fileName
	 * @param content
	 * @return
	 */
	public static File createFile(String fileName, String content) {
		File file = null;
		// 写文件流
		try {
			file = new File(fileName);
			file.createNewFile();
			FileOutputStream fos = new FileOutputStream(fileName);
			PrintWriter pw = new PrintWriter(fos);
			pw.write(content);
			pw.flush();
			pw.close();
			fos.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return file;
	}
	
	/**
	 * 文件复制
	 * @param srcFile 源文件
	 * @param destFile 目标文件
	 * @throws Exception
	 */
	public static void copy(File srcFile, File destFile) throws Exception {
		// 读文件流
		FileInputStream fis = new FileInputStream(srcFile);
		// 写文件流
		FileOutputStream fos = new FileOutputStream(destFile);
		byte[] b = new byte[1024];
		int len = -1;
		// 循环读写文件
		while (-1 != (len = fis.read(b))) {
			fos.write(b, 0, len);
		}
		fos.flush();
		fos.close();
		fis.close();
	}
	
	/**
	 * 从目录中取出指定后缀名的文件
	 * @param file  文件目录
	 * @param fileName  后缀名
	 * @return 满足条件的文件数组
	 */
	public static File[] getFilesByFileNameFromDir(File file,final String fileName){
		if(file!=null&&fileName!=null&&fileName.length()>0){
			File[] files = file.listFiles(new FileFilter() {
				@Override
				public boolean accept(File file) {
					return file.getName().endsWith(fileName);
				}
			});
			return files;
		}
		return new File[0];
	}
	/**
	 * 将给定的文件夹里的文件名输出
	 * @param file 给定的文件夹
	 * @return true:读取到了文件    false:没有读取到文件
	 */
	public static boolean showFileNameFromDir(File file) {
		// 在方法中不能完全信赖给定的参数
		// 一定要对参数进行较为完整的逻辑判断后再加以利用
		if (file == null) {
			System.out.println("文件为空！");
		} else {
			// 判断当前file是否为一个文件
			if (file.isFile()) {
				System.out.println(file.getName());
				// 如果是一个目录
			} else if (file.isDirectory()) {
				// 此方法返回一个File数组，里面的每个元素都是当前file目录的子文件对象
				File[] subFiles = file.listFiles();
				System.out.println();
				System.out.println(file.getName() + "文件中包含" + subFiles.length + "个文件");
				// 循环子文件数组，将每个文件的文件名打印
				for (File subFile : subFiles) {
					System.out.println(subFile.getName());
				}
			}
			return true;
		}
		return false;
	}
	
	/**
	 * 根据给定的路径,读取对应的文件内容以字节数组返回
	 * 1:将路径封装为一个File对象
	 * 2:创建需要返回的字节数组,长度以file对应的文件大小一致
	 * 3:创建FileInputStream
	 * 4:根据FileInputStream读取文件,将内容存放到字节数组中
	 */
	public static byte[] read(String fileName) throws Exception {
		File file = new File(fileName);
		if (file.exists()) {
			FileInputStream input = new FileInputStream(file);
			byte[] buff = new byte[(int) file.length()];
			input.read(buff);
			input.close();// 释放掉输入流(释放资源)
			return buff;
		}
		return new byte[0];
	}
	
	public static void main(String[] args) throws Exception {
		FileInputStream fis = new FileInputStream("." + File.separator + "img.jpg");
		FileOutputStream fos = new FileOutputStream("." + File.separator + "copy.jpg");
		BufferedInputStream bis = new BufferedInputStream(fis);
		BufferedOutputStream bos = new BufferedOutputStream(fos);
		int i = 0;
		long start = System.currentTimeMillis();
		while ((i = bis.read()) != -1) {
			bos.write(i);
		}
		long end = System.currentTimeMillis();
		System.out.println("总共耗时:" + (end - start));
		bos.flush();// 对于缓冲输出流来说，这个方法是必要的
		bos.close();
		bis.close();
		fos.close();
		fis.close();
	}
	
	/**
	 * 实现文件的拷贝
	 * 1:定位准备拷贝的文件
	 * 2:创建FileInputStream从源文件中读取数据
	 * 3:循环读取字节
	 * 4:创建FileOutputStream，定位目标文件(拷贝的文件)
	 * 5:将读取的每个字节通过FileOutputStream写入到拷问文件中
	 */
	public static void copyFile() throws Exception{
		FileInputStream fis = new FileInputStream("."+File.separator+"img.jpg");
		FileOutputStream fos = new FileOutputStream("."+File.separator+"copy.jpg");
		int b=0;
		long start = System.currentTimeMillis();
		while((b=fis.read())!=-1){
			fos.write(b);
		}
		long end = System.currentTimeMillis();
		System.out.println("总共耗时:"+(end-start));
		fis.close();
		fos.close();
	}
	
	/**
	 * 实现深度复制
	 * 1.创建ByteArrayOutputStream
	 *   这个输出流不是将数据输出到外界，而是自身封装了一个byte[]，将通过ByteArrayOutputStream写出的字节保存到自身的这个
	 *   byte[]中，数组长度不够会自动扩容
	 * 2.创建ObjectOutputStream,用来封装ByteArrayOutputStream
	 * 3.通过ObjectOutputStream将对象写入这里实际上就是写入到了ByteArrayOutputStream[]中了
	 * 4.通过ByteArrayOutputStream的toByteArray()方法将内部的byte[]返回，这样我们就拿到了对象序列化后的那个字节数据了
	 * 5.创建ByteArrayInputStream
	 * 6.将byte[]交给ByteArrayInputStream,这样ByteArrayInputStream就代表了我们序列化后的对象byte[]了
	 * 7.创建ObjectInputStream从ByteArrayInputStream中获取数据
	 * 8.反序列化对象，从而得到了拷贝后的对象
	 */
	public static Object copyObject(Object obj) throws Exception {
		ByteArrayOutputStream buff = new ByteArrayOutputStream();
		ObjectOutputStream oos = new ObjectOutputStream(buff);
		oos.writeObject(obj);
		byte[] objbuff = buff.toByteArray();// 从ByteArrayOutputStream中获取序列化后的对象的字节数组
		//再将对象序列化后的字节数组封装为一个ByteArrayInputStream
		ByteArrayInputStream input = new ByteArrayInputStream(objbuff);
		ObjectInputStream objInput = new ObjectInputStream(input);
		return objInput.readObject();
	}

}
