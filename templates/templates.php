<script type="text/template" id="master_template">
	<div id="masterTemplate">
		<div id="descriptionTemplate"></div>
		<div id="headlineTemplate"></div>
		<div id="navigationTemplate"></div>
		<div id="itemPane"></div>
		<div id="localizationPane">
			<div id="languageTemplate"></div>
			<div id="countryTemplate"></div>
		</div>
	</div>
	<div id="notViewable">Content is not currently available for this device or screen resolution.</div>
</script>
<script type="text/template" id="description_template">
	<p><%= description %></p>
</script>
<script type="text/template" id="headline_template">
	<div class="heading"><p class="innerHeading"><%= statusText %></p></div>
</script>
<script type="text/template" id="navigation_template_init">
	<div id="theNav">
		<div class="centerBig">
			<%= navDefault %>
		</div>
	</div>
</script>
<script type="text/template" id="navigation_template">
	<div id="theNav"></div>
</script>
<script type="text/template" id="navigation_tab_template">
	<div class="fullWidth inactive">
		<p class="navTab" id="<%= id %>" href="<%= link %>"><%= title %></p>
	</div>
</script>
<script type="text/template" id="items_template">
	<div id="itemContent">
	<div class="centerBig">
		<%= itemDefault %>
	</div>
	</div>
</script>
<script type="text/template" id="item_template">
	<div class="bodyHTML subSection">
		<p class="itemHeading"><%= title %></p>
		<div class="bodyText">
		<%= description %>
			<p class="toLink"><a  href="<%= link %>"><%= link %></a></p>
		</div>
	</div>
</script>
<script type="text/template" id="countries_template">
	<div class="heading">
		<p class="innerHeading">
			<%= chooseCountry %>
		</p>
		<p class="innerHeading">
			<span class="bolded">
				<select id="countrySelect"><option><%= country %></option></select>
			</span> 
		</p>
	</div>
</script>
<script type="text/template" id="languages_template">
	<div class="heading">
		<p class="innerHeading">
			<%= chooseLanguage %>
		</p>
		<p class="innerHeading">
			<span class="bolded">
				<select id="languageSelect"><option><%= language %></option></select>
			</span> 
		</p>
	</div>
</script>
<script type="text/template" id="country_template">
	<option class="country" value='<%= name %>'><%= name %></option>
</script>
<script type="text/template" id="language_template">
	<option class="language" value='<%= code %>'><%= name %></option>
</script>
