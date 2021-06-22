/**
 * @description 回调函数和 promise 的用法对比
 */

const fs = require('fs');
const path = require('path');
const process = require('process')
let imgPath = ''
let curPath = process.cwd().toString()

if (/demo/.test(curPath)) {
	// powershell 运行（node 运行环境在当前文件）
	imgPath = '../img/sl.jpg'
} else {
	// vscode 输出（node 运行环境在根文件）
	imgPath = './Fragement/Promise/demo/img/sl.jpg'
}
// 成功的回调函数
function successCallback(result) {
	console.log("图片读取成功: ");
	console.log(result);
}

// 失败的回调函数
function failureCallback(error) {
	console.log("图片读取失败: " + error);
}

// 随意加点配置
let imageSettings = {
	img: true
}

// 回调函数写法
/*
function createImageFileAsync(imageSettings, successCallback, failureCallback) {
	if (!imageSettings) {
		return
	}
	fs.readFile(path.resolve(imgPath), 'base64', function (err, buffer) {
		if (err) {
			failureCallback(err);
		} else {
			successCallback(buffer);
		}
	});
}

createImageFileAsync(imageSettings, successCallback, failureCallback)
*/

// promise 写法
function createImageFileAsync(imageSettings) {
	if (!imageSettings) {
		return
	}
	return new Promise((res, rej) => {
		fs.readFile(path.resolve(imgPath), 'base64', function (err, buffer) {
			if (err) {
				rej(err);
			} else {
				res(buffer);
			}
		});
	})
}

createImageFileAsync(imageSettings).then(successCallback, failureCallback)
