import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Hidden,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import History from "../../routes/History";
import { useSelector } from "react-redux";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useLocation } from "react-router";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#fff",
  },
  drawerContainer: {
    overflow: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    overflowX: "hidden",
    backgroundColor: theme.palette.background.drawer,
    color: theme.palette.text.light,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: "auto",
  },
  activeNav: {
    backgroundColor: "rgba(208, 158, 92, 1)",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function MainLayout(props) {
  const { messages } = props.intl;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sublinksOpen, setSublinksOpen] = useState({ contracts: false });
  const lang = useSelector((state) => state.lang);
  const classes = useStyles({ lang });

  const navLinks = [
    {
      name: "dashboard",
      path: "",
      activeCondition: History.location.pathname.split("/")[1] === "",
      text: messages.navbar.dashboard,
      subLink: false,
    },
    {
      name: "cases",
      path: "cases",
      activeCondition: History.location.pathname.split("/")[1] === "cases",
      text: messages.navbar.cases,
      subLink: false,
    },
    {
      name: "userManagement",
      path: "userManagement",
      activeCondition:
        History.location.pathname.split("/")[1] === "userManagement",
      text: messages.navbar.userManagement,
      subLink: false,
    },
    {
      name: "revisions",
      path: "revisions",
      activeCondition: History.location.pathname.split("/")[1] === "revisions",
      text: messages.navbar.revisions,
      subLink: false,
    },
    {
      name: "contracts",
      // path: "contracts",
      activeCondition: History.location.pathname.split("/")[1] === "contracts",
      text: messages.navbar.contracts,
      subLink: [
        {
          path: "contracts/test",
          activeCondition:
            History.location.pathname.split("/")[1] === "contracts" &&
            History.location.pathname.split("/")[2] === "test",
          text: messages.navbar.contracts,
          subLink: false,
        },
      ],
    },
    {
      name: "settings",
      path: "settings",
      activeCondition: History.location.pathname.split("/")[1] === "settings",
      text: messages.navbar.settings,
      subLink: false,
    },
  ];

  const handleNavigation = (link) => {
    link.subLink
      ? setSublinksOpen({
          ...sublinksOpen,
          [link.name]: !sublinksOpen[link.name],
        })
      : History.push(`/${lang}/${link.path}`);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? window.document.body : undefined;

  const drawer = (
    <div>
      <div className={classes.drawerContainer} />
      <div className="d-flex justify-content-center my-4">
        <img
          alt=""
          src=""
          style={{
            height: "3em",
          }}
        />
        <span>Law Firm</span>
      </div>
      <List>
        {navLinks.map((link, i) => (
          <>
            <ListItem
              className="f_size_14"
              key={i}
              button
              onClick={() => handleNavigation(link)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText
                primary={link.text}
                className={link.activeCondition ? classes.activeNav : ""}
              />
              {link.subLink &&
                (sublinksOpen[link.name] ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {link.subLink && (
              <Collapse
                in={sublinksOpen[link.name]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {link.subLink.map((sublink) => (
                    <ListItem
                      button
                      className={classes.nested}
                      onClick={() => handleNavigation(sublink)}
                    >
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary={sublink.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon className="text-white" />
          </IconButton>
          <div className="d-flex justify-content-end w-100 align-items-center">
            {/* <div className="d-flex">
              <MenuButton content="User name" />
            </div> */}
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={"left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main>{props.children}</main>
    </div>
  );
}

export default injectIntl(MainLayout);
