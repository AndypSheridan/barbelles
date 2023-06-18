import React from "react";
import communityImage6 from "../assets/community6.jpg";
import communityImage2 from "../assets/community3.jpg";
import communityImage1 from "../assets/community4.jpg";
import communityImage5 from "../assets/community5.jpg";
import communityImage3 from "../assets/kateross.jpg";
import SocialLinks from "../components/SocialLinks";
import Container from "react-bootstrap/Container";
import styles from "../styles/About.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const About = () => {
	return (
		<Container className={styles.AboutContainer}>
			<h1 className={`${styles.AboutHeader} text-center`}>
				About our community
			</h1>
			<Row className={`${styles.AboutRow1} mt-4`}>
				<Col className={`${styles.AboutCol2}`} lg={4}>
					<img
						className={`${styles.AboutCol2Image} img-fluid`}
						src={communityImage1}
						alt="woman sitting with medicine ball"
					/>
				</Col>
				<Col
					className={`${styles.AboutCol1} d-flex align-items-center align text-center p-4`}
					lg={4}
				>
					<Container className="align-items-center">
						<h2>BarBelles...?</h2>
						<p>
							Yes, BarBelles! We think it's a clever play on words
							but we are also an online fitness community for
							women! Whether you have never trained a day in your
							life, or you're a seasoned pro, our mission
							statement is to provide a safe, inspiring and fun
							space for you to share your own fitness journey.
							Bought a fresh pair of trainers? Share it! Just made
							the school run exactly that? Share it!
						</p>
					</Container>
				</Col>
				<Col className={`${styles.AboutCol2}`} lg={4}>
					<img
						className={`${styles.AboutCol2Image} img-fluid`}
						src={communityImage5}
						alt="woman on cross trainer"
					/>
				</Col>
			</Row>
			<Row className={`${styles.AboutRow1}`}>
				<Col
					className={`${styles.AboutCol1} d-flex align-items-center align text-center p-4`}
					lg={4}
				>
					<Container className="align-items-center">
						<h2>What else can I do?</h2>
						<p>
							Struggling for inspiration? Check out the tutorials
							section. You can bookmark tutorials so they appear
							in the 'Saved' section of the navbar. We are always
							adding new content so if nothing ignites that fire,
							check back again regularly!
						</p>
						<p>
							Follow other users! You can easily follow other
							users and like their posts! Posts you have liked
							will be saved in the 'Liked' tab in the navbar so
							you can easily find them again! You can also comment
							on their posts.
						</p>
						<p>
							Tell us a bit more about yourself by updating your
							profile and even upload an image!
						</p>
					</Container>
				</Col>
				<Col className={`${styles.AboutCol2}`} lg={4}>
					<img
						className={`${styles.AboutCol2Image} img-fluid`}
						src={communityImage3}
						alt="kate training"
					/>
				</Col>
				<Col
					className={`${styles.AboutCol1} d-flex align-items-center align text-center p-4`}
					lg={4}
				>
					<Container className="align-items-center">
						<h2>Who's in charge here anyway?</h2>
						<p>
							BarBelles was started in 2021 by Kate Ross (check
							her out pumping those battle ropes!) Kate is a
							leading industry expert with over ten years
							experience as a Trainer and Fitness Manager. But the
							road to discovering the benefits of fitness wasn't
							an easy one for Kate, which makes her perfectly
							placed to help out any of you who are hesitant to
							start on your own path!
						</p>
					</Container>
				</Col>
			</Row>
			<Row className={`${styles.AboutRow1}`}>
				<Col className={`${styles.AboutCol2}`} lg={4}>
					<img
						className={`${styles.AboutCol2Image} img-fluid`}
						src={communityImage2}
						alt="group of women sitting"
					/>
				</Col>
				<Col
					className={`${styles.AboutCol1} d-md-flex align text-center p-4`}
					lg={4}
				>
					<Container className="align-items-center d-flex justify-content-center">
						<SocialLinks />
					</Container>
				</Col>
				<Col className={`${styles.AboutCol2} d-none d-md-flex`} lg={4}>
					<img
						className={`${styles.AboutCol2Image} img-fluid`}
						src={communityImage6}
						alt="woman smiling"
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default About;
