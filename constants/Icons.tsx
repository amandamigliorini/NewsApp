import { Ionicons } from "@expo/vector-icons";
//set the icons of the tab bar
export const icon = {
  index: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="home" size={24} color={color} />
    ) : (
      <Ionicons name="home-outline" size={24} color={color} />
    ),
  discover: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="compass" size={25} color={color} />
    ) : (
      <Ionicons name="compass-outline" size={25} color={color} />
    ),
  bookmarks: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="bookmarks" size={22} color={color} />
    ) : (
      <Ionicons name="bookmarks-outline" size={22} color={color} />
    ),
};
