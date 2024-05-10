import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,

    PowerIcon,
    BookmarkSquareIcon
  } from "@heroicons/react/24/solid";
  import { Link, NavLink } from "react-router-dom";
// import User from "../../../../Backend/models/User.mjs";

  export function Sidebar() {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <>
        <aside style={{height:'100vh'}}>
      <Card className="w-8 p-4 shadow-xl shadow-blue-gray-900/5 h-screen" style={{backgroundColor:'#f8f9f5',height:'100vh'}}>
        <div className="mb-5 p-4" >
          <Typography variant="h5" color="blue-gray">
          Hello {user && user.name}
          </Typography>
        </div>
        <List className="">
        <NavLink to="/dashborad"  >
          <ListItem className="my-9"   style={{marginBottom:'15px'}}>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-15 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          </NavLink>
          <NavLink to="/Buss"  >
          <ListItem style={{marginBottom:'15px'}}>
            <ListItemPrefix>
              <BookmarkSquareIcon className="h-15 w-5" />
              
            </ListItemPrefix>
            Buss
          </ListItem>
          </NavLink>
          {/* <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-15 w-5" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
          </ListItem> */}
          <ListItem  style={{marginBottom:'15px'}}>
            <ListItemPrefix>
              <UserCircleIcon className="h-15 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem  style={{marginBottom:'15px'}}>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-15 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem  style={{marginBottom:'15px'}}>
            <ListItemPrefix>
              <PowerIcon className="h-15 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
        
        {/* <NavLink to="/blogs" activestyle="true">Aabout</NavLink>
        <NavLink to="/blogs" activestyle="true">Aabout</NavLink> */}
      </Card>
      </aside>
      </>
    );
  }
  export default Sidebar;