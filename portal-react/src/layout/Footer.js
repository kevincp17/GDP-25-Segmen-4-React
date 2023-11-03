import '../css/Layout.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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
                        <i class="fa-solid fa-location-dot"></i>
                        Find location on map
                    </button>

                </div>

                <div id="footer-up2">
                    <p>ABOUT US</p>
                    <a>Company Overview</a>
                    <a>CEO Notes</a>
                    <a>Executive Profiles</a>
                </div>

                <div id="footer-up3">
                    <p>SERVICES</p>
                    <a>ARRA</a>
                    <a>Data & Analytics</a>
                    <a>Business Support Solution</a>
                    <a>Integration & Automation</a>
                    <a>Talent Augmentation</a>
                </div>

                <div id="footer-up4">
                    <p>MORE</p>
                    <a>Products</a>
                    <a>Newsroom</a>
                    <a>Career</a>
                </div>
            </div>

            <div id="footer-down">
                <p>
                    © 2023. GDP Segmen 4
                </p>

                <div id="footer-down-btn">
                    <button>
                        <InstagramIcon/>
                    </button>

                    <button>
                        <LinkedInIcon/>
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