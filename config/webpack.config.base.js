const path=require("path");
const ROOT_PATH=path.resolve(__dirname,"../");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const webpack=require("webpack");
const HappyPack=require("happypack");
const CopyWebpackPlugin=require("copy-webpack-plugin");
const CleanWebpackPlugin=require("clean-webpack-plugin");

module.exports={
    entry:{
        index:path.resolve(ROOT_PATH,"src/index.js")
    },
    output:{
        filename:'[name]_[hash:8].js',
        path:path.resolve(ROOT_PATH,"dist")
    },
    watch:true,
    watchOptions:{
        poll:1000,
        aggregateTimeout:500,
        ignored:/node_modules/
    },
    plugins:[
        new CopyWebpackPlugin([
            {from:path.resolve(ROOT_PATH,"src/public/static"),to:"./"}
        ]),
        new CleanWebpackPlugin(['dist'],{
            root:ROOT_PATH,
            exclude:['_dll_react.js','manifest.json']
        }),
       
        new HappyPack({
            id:"js",
            use:[{
                loader:"babel-loader",
                options:{
                    presets:['@babel/preset-env','@babel/preset-react'],
                    plugins:[
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                        "@babel/plugin-transform-runtime",
                        "react-hot-loader/babel"
                    ]
                }
              
            }]
        }),
        new HtmlWebpackPlugin({
            template:path.resolve(ROOT_PATH,"src/public/template/index.html"),
            filename:"index.html",
           inject:true,
            hash: true, //是否添加hash值
            minify: { //压缩HTML文件
                removeComments: true,//移除HTML中的注释
                collapseWhitespace: true ,//删除空白符与换行符
                removeAttributeQuotes:true
            },
            chunks:['index']
        }),
        new webpack.BannerPlugin('by feng lin')
        // ,new webpack.IgnorePlugin() // 忽略编译
        ,new webpack.DllReferencePlugin({
            manifest:path.resolve(ROOT_PATH,'dist','manifest.json')
        }) // dll 动态连接库
    ],
    module:{
        // noParse:/jquery/, // 不解析jquery模块的依赖关系
        rules:[
            {
                test:/\.html$/,
                use:"html-withimg-loader"
            },
            {
                test:/\.(png|jpg|gif)$/,
                exclude:path.resolve(ROOT_PATH,"src/public/static"),
                use:[{
                        loader:"url-loader",
                        options:{
                            limit:200*1024,
                            outputPath:"/img/"
                        }
                    },
                    'image-webpack-loader'//图片压缩工具
                ]
            },
            {
                test:/\.js$/,
                exclude:/mode_modules/,
                include:path.resolve(ROOT_PATH,"src"),
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:['@babel/preset-env','@babel/preset-react'],
                        plugins:[
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                            "@babel/plugin-transform-runtime",
                            "react-hot-loader/babel"
                        ]
                    }
                }
                  
                
            }
           
        ]
    }
}