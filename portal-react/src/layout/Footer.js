import '../css/Layout.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Footer(){
    return(
        <div id="footer-div">
            <div id="footerup">
                <div id="footer-up1">
                    <p>Bumi Amartha Teknologi Mandiri</p>

                    <p>
                        Chase Plaza 9<sup>th</sup> Floor, Jl Jend. Sudirman Kav 21, Karet, Setiabudi, Jakarta Selatan
                        12920. Indonesia
                    </p>

                    <button>
                        <LocationOnIcon style={{color:"#86BD5F"}}/>
                        Find location on map
                    </button>
                </div>

                <div id="footer-up2">
                    {/* <p>ABOUT US</p>
                    <a>Company Overview</a>
                    <a>CEO Notes</a>
                    <a>Executive Profiles</a> */}
                </div>

                <div id="footer-up3">
                    <p>OPTIONS</p>
                    <a href='careers'>Careers</a>
                    <a href='interviews'>Interviews</a>
                </div>

                <div id="footer-up4">
                    {/* <p>MORE</p>
                    <a>Products</a>
                    <a>Newsroom</a>
                    <a>Career</a> */}
                </div>
            </div>

            <div id="footer-down">
                <p>
                    © 2023. GDP Segmen 4
                </p>

                <div id="footer-down-btn">
                    <button>
                        <InstagramIcon style={{width:"16px"}}/>
                    </button>

                    <button>
                        <LinkedInIcon style={{width:"16px"}}/>
                    </button>
                </div>
                
                <button>
                    <p>scroll up</p>
                    <ArrowUpwardIcon/>
                </button>
            </div>
        </div>
    )
}