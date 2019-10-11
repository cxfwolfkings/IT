# npm

## 目录

1. [总结](#总结)
   - [快速删除node_modules目录](#快速删除node_modules目录)

## 总结

### 快速删除node_modules目录

1

```sh
cnpm install rimraf -g
rimraf node_modules
```

2

```sh
rmdir /s/q your_app_dir
# /s 是代表删除所有子目录跟其中的档案。
# /q 是不要它在删除档案或目录时，不再问我 Yes or No 的动作。
# 要删除的目录前也可以指定路径，如： rmdir /s/q d:\123\abc
```

3

```sh
rm -f /node_modules
```

4

```sh
cnpm install -g dlf
dlf  C:\Users\92809\Desktop\12
```
