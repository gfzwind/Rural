/**
 * 转化工具类
 */
declare class StringUtil {
    static htmlEncode(str: string): string;
    static htmlDecode(str: string): string;
    static isEmptyOrNull(str: string): boolean;
    static getDoubleQuoteString(str: string): string;
    static getLastSlashContent(str: string): string;
    static isHasClass(e: HTMLElement, c: string): boolean;
    static addClass(e: HTMLElement, c: string): void;
    static removeClass(e: HTMLElement, c: string): void;
}
/**
 * 时间工具类
 */
declare class DateUtil {
    static dateFormat(time: number): string;
    static toDouble(num: number): string;
    static getDateDiff(time: string): string;
}
/**
 * Cookie工具类
 */
declare class CookieUtil {
    static set(name: any, value: any, expires?: Date, domain?: any, path?: any, secure?: any): void;
    static get(name: any): string;
    static unset(name: any, domain?: any, path?: any, secure?: any): void;
}
/**
 * 分页插件
 */
declare class Pageable {
    /**
     * 总页数
     */
    totalPages: number;
    /**
     * 可视页数
     */
    visiblePages: number;
    /**
     * 当前页数
     */
    nowPage: number;
    /**
     * 父级元素
     */
    private parentElement;
    firstTemplate: string;
    endTemplate: string;
    constructor(totalPages: number, visiblePages: number, nowPage: number, parentElement: HTMLElement);
    /**
     * 创建分页
     */
    create(): void;
    /**
     * 创建通用模板
     */
    private createTemplate();
    /**
     * 创建省略模板
     */
    private createEllipsisTemplate();
    /**
     * 创建页码模板
     * @param num
     */
    private createPageNumTemplate(num);
    /**
     * 页码点击事件
     * @param e
     */
    private onClick(e);
    /**
     * 页面改变(to do ajax)
     */
    pageChange(): void;
    /**
     * 改变页码
     * @param num
     */
    changePageNum(num: number): void;
}
/**
 * 分页插件的className
 * 0: first
 * 1: previous
 * 2: ellipsis
 * 3: num
 * 4: next
 * 5: end
 * 6: item
 * 7: disable
 * 8: active
 */
declare enum PageableClassEnum {
    "pageable-first" = 0,
    "pageable-previous" = 1,
    "pageable-ellipsis" = 2,
    "pageable-num" = 3,
    "pageable-next" = 4,
    "pageable-end" = 5,
    "pageable-item" = 6,
    "pageable-disable" = 7,
    "pageable-active" = 8,
}
