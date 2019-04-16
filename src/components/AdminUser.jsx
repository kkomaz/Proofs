import React, { Component } from 'react'

class AdminUser extends Component {
  render() {
    return (
      <div id="wrapper">
					<section id="main">
						<header>
							<span class="avatar"><img src="images/avatar.jpg" alt="" /></span>
							<h1>Jane Doe</h1>
							<p>Senior Psychonautics Engineer</p>
						</header>
						<hr />
						<hr />
						<footer>
							<ul class="icons">
								<li><a href="#" class="fa-twitter">Twitter</a></li>
								<li><a href="#" class="fa-instagram">Instagram</a></li>
								<li><a href="#" class="fa-facebook">Facebook</a></li>
							</ul>
						</footer>
					</section>

					<footer id="footer">
						<ul class="copyright">
							<li>&copy; Jane Doe</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
						</ul>
					</footer>
			</div>
    )
  }
}

export default AdminUser
