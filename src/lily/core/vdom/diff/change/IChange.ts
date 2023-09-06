/**
 * @author linwukang
 */

/**
 * 变化接口
 * 用于记录对象和值的变化
 *
 * @author linwukang
 */
export default interface IChange {
    /**
     * 获取目标对象
     */
    getTarget(): Node

    /**
     * 执行变化，修改真实 DOM
     */
    apply(): boolean
}

