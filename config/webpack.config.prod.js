const webpackMerge=require("webpack-merge");
const baseConfig=require("./webpack.config.base.js");
const path=require("path");
const ROOT_PATH=path.resolve(__dirname,"../");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const UglifyJsPlugin=require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin=require("optimize-css-assets-webpack-plugin");
module.exports=webpackMerge(baseConfig,{
    mode:"production",
    optimization:{
        minimizer:[
            new UglifyJsPlugin({
                cache:true,
                parallel:true,
                sourceMap:true
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks:{
            cacheGroups:{
                common:{
                    minSize:0,
                    minChunks:2,
                    chunks:'initial'
                },
                vendor:{
                    priority:1,
                    test:/mode_modules/,
                    chunks:'initial',
                    minSize:0,
                    minChunks:2
                }
            }
        }
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:"/css/[name]_[hash:8].css"
        })
       
    ],
    module:{
        rules:[
            
            {
                test:/\.css$/,
                exclude:/mode_modules/,
                include:path.resolve(ROOT_PATH,"src"),
                use:[
                    {loader:MiniCssExtractPlugin.loader},
                    {loader:"css-loader"},
                    {loader:"postcss-loader"}
                ]
            },
            {
                test:/\.scss$/,
                exclude:/mode_modules/,
                include:path.resolve(ROOT_PATH,"src"),
                use:[
                    {loader:MiniCssExtractPlugin.loader},
                    {loader:"css-loader"},
                    {loader:"postcss-loader"},
                    {loader:"sass-loader"}
                ]
            },
            {
                test:/\.less$/,
                exclude:/mode_modules/,
                include:path.resolve(ROOT_PATH,"src"),
                use:[
                    {loader:MiniCssExtractPlugin.loader},
                    {loader:"css-loader"},
                    {loader:"postcss-loader"},
                    {loader:"less-loader"}
                ]
            }
        ]
    }
});