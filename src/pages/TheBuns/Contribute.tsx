import './Contribute.css'

const RegisterNewBunsInformation = () => <section className='py-52 justify-center flex flex-col items-center h-[75vh]'>
    <div>
        <h2 className='text-center text-8xl pb-6 text-contribute-animate'>Bidra?</h2>
    </div>
    <div>
        <p className='pb-2'>Det er ikke mye til kriteriene - eneste er at du har:</p>
        <ul className='list-disc list-inside pb-6'>
            <li>Vært et eller anna sted med bakst <strong>langs veien</strong></li>
            <li>Lagd en formening om utvalget og håndverket</li>
            <li>Nice to have: Tatt noen bilder?</li>
        </ul>
        <div className='text-center'>
            <p>I såfall er det bare å klikke seg over<br/></p>
            <h4 className='text-4xl uppercase'>👉 hit 👈</h4>
            <p>og få registrert stedet</p>
        </div>
    </div>
</section>

export default RegisterNewBunsInformation
