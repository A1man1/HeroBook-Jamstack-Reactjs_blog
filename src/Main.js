import React, { memo, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import { withStyles } from "@material-ui/core";
import "aos/dist/aos.css";
import CookieRulesDialog from "./cookies/CookieRulesDialog";
import CookieConsent from "./cookies/CookieConsent";
import Routing from "./Routing";
import smoothScrollTop from "./shared/functions/smoothScrollTop";
import NavBar from './NavBar';

AOS.init({ once: true });

const styles = (theme) => ({
  wrapper: {
    backgroundColor: theme.palette.common.white,
    overflowX: "hidden",
  },
});

function Main(props) {

  const { classes } = props;
  const [blogPosts, setBlogPosts] = useState([]);
  const [isCookieRulesDialogOpen, setIsCookieRulesDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);



  const selectBlog = useCallback(() => {
    smoothScrollTop();
    document.title = "Herobook";
    setSelectedTab("Blog");
  }, [setSelectedTab]);


  const handleCookieRulesDialogOpen = useCallback(() => {
    setIsCookieRulesDialogOpen(true);
  }, [setIsCookieRulesDialogOpen]);

  const handleCookieRulesDialogClose = useCallback(() => {
    setIsCookieRulesDialogOpen(false);
  }, [setIsCookieRulesDialogOpen]);


    useEffect(() => {
      // By moving this function inside the effect, we can clearly see the values it uses.
      async function fetchProduct()
       {
         const response = await fetch('http://127.0.0.1:8000/api');
         const blogPosts = await response.json();
         const blo=blogPosts.map((blogPost) => {
          blogPost.url = `/blog/post/${blogPost.title}`;
          blogPost.params = `?id=${blogPost.id}`;
          return blogPost;});
         setBlogPosts(blo);
        }

      fetchProduct();
    }, []);  //  Valid because our effect only uses productId  // ...


  return (
    <div className={classes.wrapper}>
      <NavBar />
      {!isCookieRulesDialogOpen && (
        <CookieConsent
          handleCookieRulesDialogOpen={handleCookieRulesDialogOpen}
        />
      )}


      <Routing blogPosts={blogPosts} selectBlog={selectBlog} />

    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
