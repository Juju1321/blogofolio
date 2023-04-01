export type TabsType = {
    title: string,
    disabled: boolean,
    key: number,
}

export enum TabsNames {
    All,
    MyPosts,
    Popular,
    Favourites
}

export type TabsProps = {
    activeTab: number,
    onClick: (key: TabsNames) => void
}