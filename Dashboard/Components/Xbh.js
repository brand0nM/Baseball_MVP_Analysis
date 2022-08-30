import React from 'react'
import Plotly from 'react-plotly.js'
import filteredXBH from './Helper_Functions/Helper'

export default function Xbh({data, form}){
	const [nationalLeague, setNationLeague] = React.useState();
	const [americanLeague, setAmericanLeague] = React.useState();


	function setStatus(data, form) {
		if (form.NL === true) {createTrace(data, form, 'NL', 'National League', '#D8BFD8')} 
		else {setNationLeague({x:form.season, y:[ ], type: 'box', marker: {color: '#D8BFD8'}})}
		if (form.AL === true) {createTrace(data, form, 'AL', 'American League', '#F5F5DC')}
		else {setAmericanLeague({x:form.season, y:[ ], type: 'box', marker: {color: '#D8BFD8'}})}

	}
	function createTrace(data, form, league, name, color) {
		let mvp = form.MVP? '1': false;
		let nonmvp = form.nonMVP? '0': false;
		let x = data.filter(person => (filters(person, league, form, mvp, nonmvp))).map(player => (player.Season))
		let y = data.filter(person => (filters(person, league, form, mvp, nonmvp))).map(getXBH)
		if (league === 'NL') {setNationLeague({x:x, y:y, type: 'box',  name: name, marker: {color: color}})}
		else {setAmericanLeague({x:x, y:y, type: 'box',  name: name, marker: {color: color}})}
	}
	function filters(person, league, form, mvp, nonmvp) {
		if (person.lgID === league && person.Season <= form.season[1] 
			&& person.Season >= form.season[0] &&
			(person.MVP === mvp || person.MVP === nonmvp)) {
			return person
		}
	}
	function getXBH(player) {
		if (player['XBH+'] !== undefined) {
			return player['XBH+']
		}
		return 0
	}


	React.useEffect(() => {
		if (data) {
			setStatus(data, form);
		};
	}, [data, form]);
	return (
		<div className='xbh'>
		{data &&
			<Plotly
				data={[
					nationalLeague && nationalLeague,
					americanLeague && americanLeague,
					{type: 'box', x: [], y: []},
				]}
				layout={{title: 'XBH+ vs Season', boxmode:'group', paper_bgcolor:'rgba(0,0,0,0)', 
					plot_bgcolor:'rgba(0,0,0,0)', height: 825, width: 2000, 
					font: {family: 'Courier New, monospace', size: 24, color: '#fffacd'}, 
					xaxis: {gridcolor: '#a52a2a', linecolor: '#a52a2a', zerolinecolor: '#a52a2a', 
						range:[form.season[0]-1,form.season[1]+1]}, 
					yaxis: {gridcolor: '#a52a2a', linecolor: '#a52a2a', zerolinecolor: '#a52a2a', 
						range:[-.25,.28]},showlegend:false}}
			/>
		}
		</div>
	)
}
