import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { A11y, FreeMode, Keyboard } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import { SwiperSection } from "../showcase/SwiperSection"
import { useInView } from "../../hooks/useInView"
import { CarouselControls } from "./CarouselControls"
import { ChannelCard } from "./ChannelCard"
import { GroupFilter } from "./GroupFilter"
import { defaultSkills, filterOptions } from "./skills"
import type { Skill, SkillFilter } from "./types"

import "swiper/css"
import "swiper/css/free-mode"


type InstrumentationProps = {
    skills?: Skill[]
}

export function Instrumentation({ skills = defaultSkills }: InstrumentationProps) {
    const { ref, inView } = useInView<HTMLDivElement>()
    const [filter, setFilter] = useState<SkillFilter>("all")
    const [swiper, setSwiper] = useState<SwiperType | null>(null)
    const [progress, setProgress] = useState(0)
    const [current, setCurrent] = useState(1)

    const visible = skills.filter((s) => filter === "all" || s.group === filter)

    function handleFilter(next: SkillFilter) {
        setFilter(next)
        setCurrent(1)
        setProgress(0)
    }

    return (
        <SwiperSection
            id="instrumentation"
            title="Instrumentation"
            description="Mijn skillset, kanaal voor kanaal."
            backgroundClassName="bg-black text-white"
            className="overflow-hidden"
        >


            {/* min-w-0: voorkomt dat Swiper de grid-kolom van Section opblaast */}
            <div ref={ref} className="min-w-0 space-y-6">
                <GroupFilter value={filter} options={filterOptions} onChange={handleFilter} />

                <Swiper
                    key={filter}
                    modules={[A11y, FreeMode, Keyboard]}
                    onSwiper={setSwiper}
                    onProgress={(_, p) => setProgress(p)}
                    onSlideChange={(s) => setCurrent(s.activeIndex + 1)}
                    freeMode
                    keyboard
                    slidesPerView={4.5} //auto
                    spaceBetween={12}
                    className="!overflow-visible"
                >
                    {visible.map((skill, i) => (
                        <SwiperSlide key={skill.name} className="!h-auto !w-48">
                            <ChannelCard skill={skill} index={i} active={inView} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <CarouselControls
                    current={current}
                    total={visible.length}
                    progress={progress}
                    onPrev={() => swiper?.slidePrev()}
                    onNext={() => swiper?.slideNext()}
                />
            </div>
        </SwiperSection>
    )
}