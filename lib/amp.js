inlets  = 1;
outlets = 6;




var prevFreq = 0;

var A = 440;

function list(){
	data = arrayfromargs(arguments);
	tmpPrevFreq = prevFreq;
	
	index    = data[0];
	pitch    = data[1];
	velocity = data[2] / 127;
	dur      = data[3];
	etc01    = data[4];
	etc02    = data[5];
	
	freq = m2f(pitch);
	prevFreq = freq;
	
	post(dur, "\n")
	//post("tmp", tmpPrevFreq, "\n");
	//post("tmp", freq, "\n");
	if(etc01 == 1){
		outlet(0, tmpPrevFreq);
		outlet(0, [freq, dur ]);
		post("tmp  :", tmpPrevFreq, "\n");
		post("freq :", freq, "\n");		
		post("dur  :", [freq, dur * dur * dur], "\n");		
		//post("slide", "\n");
	}else{
		outlet(0, freq);
		//outlet(0, [freq, 0]);
	//	post([freq, dur], "\n")
	}
	

	outlet(1, velocity);
	outlet(2, velocity);
	//post(velocity, "\n")
	if(etc01 == 1){
		//post(dur, "\n")
		//post(Math.pow(dur, 2), "\n")
		outlet(2, velocity);
		outlet(2, [0, Math.pow(dur, 4)]);
	}else{
		outlet(2, [0, dur]);
		//outlet(2, velocity);
	}
	outlet(3, etc01);
	outlet(4, etc02);
	outlet(5, "bang");
}

function m2f(m){
	
	//return (A / 32) * (2 ^ ((m - 9) / 12));
	return A * Math.pow(2, (m - 69) / 12);
}