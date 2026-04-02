import ModeSwitch from './layout/ModeSwitch';
import DesktopMenu from './layout/DesktopMenu';
import MobileMenu from './layout/MobileMenu';
import MobileBottomNavigation from './layout/MobileBottomNavigation';
import LeftSidebar from './layout/LeftSidebar';
import RightSidebar from './layout/RightSidebar';
import Story from './feed/Story';
import CreatePost from './feed/CreatePost';
import TestDropdown from './Testdropdown';
import PostCard from './feed/PostCard';

const Feed = () => {
    return (
        <div>
            <>
                {/*Feed Section Start*/}
                <div className="_layout _layout_main_wrapper">
                    {/*Switching Btn Start*/}
                    <ModeSwitch />
                    {/*Switching Btn End*/}
                    <div className="_main_layout">
                        {/*Desktop Menu Start*/}
                        <DesktopMenu />
                        {/*Desktop Menu End*/}
                        {/*Mobile Menu Start*/}
                        <MobileMenu />
                        {/*Mobile Menu End*/}
                        {/* Mobile Bottom Navigation */}
                        <MobileBottomNavigation />
                        {/* Mobile Bottom Navigation End */}
                        {/* Main Layout Structure */}
                        <div className="container _custom_container">
                            <div className="_layout_inner_wrap">
                                <div className="row">
                                    {/* Left Sidebar */}
                                    <LeftSidebar />
                                    {/* Left Sidebar */}
                                    {/* Layout Middle */}
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                        <div className="_layout_middle_wrap">
                                            <div className="_layout_middle_inner">
                                                <Story />
                                                <CreatePost />
                                                
                                                <PostCard />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Layout Middle */}
                                    {/* Right Sidebar */}
                                    <RightSidebar />
                                </div>
                                {/* Right Sidebar */}
                            </div>
                        </div>
                    </div>
                    {/* Main Layout Structure */}
                </div>
                {/*Feed Section End*/}
            </>

        </div>
    );
};

export default Feed;