module.exports = {
    // 讨厌eslint，不喜欢被约束，喜欢自由，自己可以自律，但是不需要别人来定规则
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    }
}
